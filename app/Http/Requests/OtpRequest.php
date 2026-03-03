<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OtpRequest extends FormRequest {

    public function authorize(): bool{
        return true;
    }

    public function rules(): array{
        return [
            'otp_1' => 'required|numeric',
            'otp_2' => 'required|numeric',
            'otp_3' => 'required|numeric',
            'otp_4' => 'required|numeric',
            'otp_5' => 'required|numeric',
            'otp_6' => 'required|numeric'
        ];
    }

    public function messages(){
        return [
            'otp_1.required' => 'OTP দিন',
            'otp_1.numeric' => 'শুধু সংখ্যা দিন',
        ];
    }
}
