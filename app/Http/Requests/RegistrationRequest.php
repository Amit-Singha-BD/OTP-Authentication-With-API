<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegistrationRequest extends FormRequest {

    public function authorize(): bool {
        return true;
    }

    public function rules(): array{
        return [
            'name'          => 'required|string|min:3|max:50',
            'email'         => 'required|email|unique:users,email',
            'phone_number'  => 'required|regex:/^[0-9]{11}$/|unique:users,phone_number',
            'gender'        => 'required|in:male,female,other',
            'username'      => 'required|min:3|max:20|unique:users,username',
            'password'      => 'required|min:8|max:20|confirmed',
        ];
    }

    public function messages(){
        return [
            'name.required'         => 'নাম অবশ্যই দিতে হবে।',
            'name.min'              => 'নাম কমপক্ষে ৩ অক্ষরের হতে হবে।',
            'name.max'              => 'নামের সর্বোচ্চ দৈর্ঘ্য ৫০ অক্ষর।',

            'email.required'        => 'ইমেইল দিতে হবে।',
            'email.email'           => 'সঠিক ইমেইল ফরম্যাট ব্যবহার করুন।',
            'email.unique'          => 'এই ইমেইলটি ইতিমধ্যে ব্যবহার করা হয়েছে।',

            'phone_number.required' => 'মোবাইল নাম্বার দিতে হবে।',
            'phone_number.regex'    => 'মোবাইল নাম্বার অবশ্যই ১১ ডিজিটের হতে হবে এবং শুধু সংখ্যা ব্যবহার করুন।',
            'phone_number.unique'   => 'এই মোবাইল নাম্বারটি ইতিমধ্যে ব্যবহার করা হয়েছে।',

            'gender.required'       => 'জেন্ডার নির্বাচন করুন।',
            'gender.in'             => 'জেন্ডার সঠিকভাবে নির্বাচন করুন।',

            'username.required'     => 'ইউজারনেম দিতে হবে।',
            'username.min'          => 'ইউজারনেম কমপক্ষে ৩ অক্ষরের হতে হবে।',
            'username.max'          => 'ইউজারনেম সর্বোচ্চ ২০ অক্ষরের হতে পারে।',
            'username.unique'       => 'এই ইউজারনেমটি ইতিমধ্যে ব্যবহার করা হয়েছে।',

            'password.required'     => 'পাসওয়ার্ড দিতে হবে।',
            'password.min'          => 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।',
            'password.max'          => 'পাসওয়ার্ড সর্বোচ্চ ২০ অক্ষরের মধ্যে হতে হবে।',
            'password.confirmed'    => 'পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না।',
        ];
    }
}
