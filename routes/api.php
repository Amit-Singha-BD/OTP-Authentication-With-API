<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIController\AuthenticationController;

Route::post('/login/submit', [AuthenticationController::class,'loginSubmit']);
Route::post('/registration/submit', [AuthenticationController::class,'registrationSubmit']);
Route::post('/otp/submit', [AuthenticationController::class,'otpSubmit']);
Route::post('/otp/resend', [AuthenticationController::class,'otpResend']);