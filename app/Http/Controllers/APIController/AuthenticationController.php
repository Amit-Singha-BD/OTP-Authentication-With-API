<?php

namespace App\Http\Controllers\APIController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegistrationRequest;
use App\Http\Requests\OtpRequest;
use App\Models\User;
use App\Services\SMSSent;

class AuthenticationController extends Controller {

    public function loginSubmit(Request $request){
        $validateData = $request->validate([
            "both"      => "required",
            "password"  => "required|min:8|max:20",
        ],[
            "both.required"     => "Please enter your email address or username.",
            "password.required" => "Password is required.",
            "password.min"      => "Password must be at least 8 characters long.",
            "password.max"      => "Password must not exceed 20 characters.",
        ]);

        $typeInput = $validateData['both'];
        $inputType = filter_var($typeInput, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        if(Auth::attempt([
            $inputType => $typeInput,
            'password' => $validateData['password'],
        ]))
        {
            $user = Auth::user();
            $token = $user->createToken('accessToken')->plainTextToken;

            return response()->json([
                "status"  => "success",
                "message" => "Login successful. Welcome back!",
                "data"    => [
                    "user"  => $user,
                    "token" => $token,
                ]
            ], 200);
        }
        return response()->json([
            "status"  => "error",
            "message" => "The email/username or password you entered is incorrect."
        ], 401);
    }

    public function registrationSubmit(RegistrationRequest $request, SMSSent $sms){
        $validateData = $request->validated();

        session()->put('validateData', $validateData);

        if(session('validateData')){
            try{
                $otp = random_int(100000, 999999);

                session()->put('otp', [
                    'code'   => $otp,
                    'expire' => now()->addMinutes(3)
                ]);

                $message = 'Your OTP is ' . $otp . '. It will expire in 3 minutes.';
                $sms->send($validateData['phone_number'], $message);

                return response()->json([
                    "status"  => true,
                    "otp"     => $otp,
                    "success" => "OTP has been sent successfully!"
                ], 200);
            }
            catch(\Throwable $e){
                session()->forget('otp');
                return response()->json([
                    "error" => "Sorry! We were unable to send the OTP. Please try again after a while."
                ], 500);
            }
        }
        return response()->json([
            "error" => "Sorry! Your registration could not be completed. Please try again later."
        ], 500);
    }

    public function otpSubmit(OtpRequest $request){
        $validateOtp = $request->validated();

        if(!session()->has('otp')){
            return response()->json([
                "error" => "Sorry! No OTP was found. Please try again."
            ], 404);
        }

        if(now()->greaterThan(session('otp.expire'))){
            session()->forget('otp');
            return response()->json([
                "error" => "Sorry! Your OTP has expired. Please request a new one."
            ], 410);
        }

        $otp = collect($validateOtp)->implode('');

        if($otp == session('otp.code')){
            User::create(session('validateData'));
            session()->forget(['validateData', 'otp']);

            return response()->json([
                "status"  => true,
                "success" => "Your registration has been completed successfully!"
            ], 200);
        }
        return response()->json([
            "error" => "Sorry! The OTP you entered is incorrect. Please try again."
        ], 422);
    }

    public function otpResend(SMSSent $sms){
        session()->forget('otp');

        if(session()->has('validateData')){
            $validateData = session('validateData');

            try{
                $otp = random_int(100000, 999999);

                session()->put('otp', [
                    'code'   => $otp,
                    'expire' => now()->addMinutes(3)
                ]);

                $message = 'Your OTP is ' . $otp . '. It will expire in 3 minutes.';
                $sms->send($validateData['phone_number'], $message);

                return response()->json([
                    "status"  => true,
                    "otp"     => $otp,
                    "success" => "OTP has been resent successfully!"
                ], 200);
            }
            catch(\Throwable $e){
                session()->forget('otp');
                return response()->json([
                    "error" => "Sorry! We were unable to resend the OTP. Please try again after a while."
                ], 503);
            }
        }
        return response()->json([
            "error" => "Sorry! Your registration could not be completed. Please try again later."
        ], 410);
    }
}