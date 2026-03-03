<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController\AuthenticationController;
use App\Http\Controllers\WelcomeController;

// Auth Routes
Route::get('/', [AuthenticationController::class, 'loginView'])->name('login.view');
Route::post('/login', [AuthenticationController::class, 'loginSubmit'])->name('login.submit');
Route::post('/logout', function(){
    Auth::logout();
    return redirect()->route('login.view')->with('success','সফলভাবে লগআউট করা হয়েছে!');
})->name('logout');

Route::get('/register', [AuthenticationController::class, 'registrationView'])->name('register.view');
Route::post('/register', [AuthenticationController::class, 'registrationSubmit'])->name('register.submit');

// Otp Route
Route::get('otp', [AuthenticationController::class, 'otpView'])->name('otp.view');
Route::post('otp', [AuthenticationController::class, 'otpSubmit'])->name('otp.submit');
Route::post('/otp/resend', [AuthenticationController::class, 'otpResend'])->name('otp.resend');

// Welcome
Route::get('/welcome', [WelcomeController::class, 'welcomeView'])->name('welcome');