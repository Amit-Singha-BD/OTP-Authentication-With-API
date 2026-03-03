<?php

namespace App\Http\Controllers\AuthController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\RegistrationRequest;
use App\Http\Requests\OtpRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Services\SMSSent;

class AuthenticationController extends Controller {
    
    // Login Methods
    public function loginView(){
        return view('Pages.Login-From');
    }

    public function loginSubmit(Request $request){
        $validateData = $request->validate([
            "both"      => "required",
            "password"  => "required|min:8|max:20",
        ],[
            "both.required"      => "Please enter your email or username.",
            "password.required"  => "Password is required.",
            "password.min"       => "Password must be at least 8 characters long.",
            "password.max"       => "Password must not exceed 20 characters.",
        ]);

        $typeInput = $validateData['both'];
        $inputType = filter_var($typeInput, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        if(Auth::attempt([
            $inputType => $typeInput,
            'password' => $validateData['password'],
        ]))
        {
            return redirect()->route('welcome')->with('success', 'Your login has been completed successfully!');
        }
        return back()->withErrors(['both' => 'The provided email/username or password is incorrect.']);
    }


    // Registration Methods
    public function registrationView(){
        return view('Pages.Registration-From');
    }

    public function registrationSubmit(RegistrationRequest $request, SMSSent $sms){
        $validateData = $request->validated();

        session()->put('validateData', $validateData);

        if(session('validateData')){
            try{
                $otp = random_int(100000, 999999);

                session()->put('otp', [
                    'code' => $otp,
                    'expire' => now()->addMinutes(3)
                ]);

                $message = 'Your OTP is ' . $otp . '. It will expire in 3 minutes.';
                $sms->send($validateData['phone_number'], $message);

                return redirect()->route('otp.view')->with('success', 'OTP has been sent successfully!');
            }
            catch(\Throwable $e){
                session()->forget('otp');
                return redirect()->back()->with('error', 'Sorry! We were unable to send the OTP. Please try again after a while.');
            }
        }
        return redirect()->back()->with('error', 'Sorry! Your registration could not be completed. Please try again later.');
    }

    // Otp Methods
    public function otpView(){
        return view('Pages.Otp-From');
    }

    public function otpSubmit(OtpRequest $request){
        $validateOtp = $request->validated();

        if(!session()->has('otp')){
            return back()->with('error', 'Sorry! No OTP was found. Please try again.');
        }

        if(now()->greaterThan(session('otp.expire'))){
            session()->forget('otp');
            return back()->with('error', 'Sorry! Your OTP has expired. Please request a new one.');
        }

        $otp = collect($validateOtp)->implode('');

        if($otp == session('otp.code')){
            User::create(session('validateData'));
            session()->forget(['validateData', 'otp']);
            return redirect()->route('login.view')->with('success', 'Your registration has been completed successfully!');
        }
        return redirect()->back()->with('error', 'Sorry! The OTP you entered is incorrect. Please try again.');
    }

    public function otpResend(SMSSent $sms){
        session()->forget('otp');

        if(session()->has('validateData')){
            $validateData = session('validateData');

            try{
                $otp = random_int(100000, 999999);

                session()->put('otp', [
                    'code' => $otp,
                    'expire' => now()->addMinutes(3)
                ]);

                $message = 'Your OTP is ' . $otp . '. It will expire in 3 minutes.';
                $sms->send($validateData['phone_number'], $message);

                return redirect()->route('otp.view')->with('success', 'OTP has been resent successfully!');
            }
            catch(\Throwable $e){
                session()->forget('otp');
                return redirect()->back()
                    ->with('error', 'Sorry! We were unable to resend the OTP. Please try again after a while.');
            }
        }

        return redirect()->back()
            ->with('error', 'Sorry! Your registration could not be completed. Please try again later.');
    }
}
