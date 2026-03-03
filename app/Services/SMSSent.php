<?php

namespace App\Services;

class SMSSent {

    public function send($phone, $message){
        $apiKey = '';

        // SMS Gateway API URL
        $url = "";

        // Send Data
        $data = [
            'token' => $apiKey,
            'to' => $phone,
            'message' => $message,
        ];

        // CURL Request
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);

        return $response;
    }
}