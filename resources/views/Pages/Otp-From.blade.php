@extends('Layout.Master-Layout')
@section('Content')

    <div class="ov-unique-card">
        <div class="mb-4">
            <i class="fa-solid fa-shield-halved fa-3x"></i>
        </div>
        <h2 class="ov-unique-title">Verify OTP</h2>
        <p class="ov-unique-subtitle">Enter the 6-digit code sent to you</p>

        <form action="{{ route('otp.submit') }}" method="POST">
            @csrf
            <div class="ov-unique-otp-container">
                <input type="text" name="otp_1" class="ov-unique-otp-input otp-field" maxlength="1" inputmode="numeric">
                <input type="text" name="otp_2" class="ov-unique-otp-input otp-field" maxlength="1" inputmode="numeric">
                <input type="text" name="otp_3" class="ov-unique-otp-input otp-field" maxlength="1" inputmode="numeric">
                <input type="text" name="otp_4" class="ov-unique-otp-input otp-field" maxlength="1" inputmode="numeric">
                <input type="text" name="otp_5" class="ov-unique-otp-input otp-field" maxlength="1" inputmode="numeric">
                <input type="text" name="otp_6" class="ov-unique-otp-input otp-field" maxlength="1" inputmode="numeric">
            </div>

            <button type="submit" name="submit" class="ov-unique-verify-btn">
                Verify Now <i class="fa-solid fa-arrow-right ms-1"></i>
            </button>
            
            <div class="ov-unique-timer-wrapper">
                <span id="ov-timer-text">Resend code in: <span id="ov-timer-count">03:00</span></span>
            </div>
        </form>

        <form action="{{ route('otp.resend') }}" method="POST" style="display: inline;">
            @csrf
            <button type="submit" name="submit" class="ov-unique-resend-link" id="ov-resend-btn" style="display: none;">
                Resend OTP
            </button>
        </form>
        
    </div>

    <script>
        const inputs = document.querySelectorAll('.otp-field');

        inputs.forEach((input, index) => {
            input.addEventListener('input', (e) => {
            if (e.target.value.length > 0 && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
            });

            input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                if (input.value === '' && index > 0) {
                inputs[index - 1].focus();
                }
            }
            });
        });

        // ২. কাউন্টডাউন টাইমার লজিক (৩ মিনিট)
        let timeLeft = 180; 

        const timerText = document.getElementById('ov-timer-text');
        const timerCount = document.getElementById('ov-timer-count');
        const resendBtn = document.getElementById('ov-resend-btn');

        const countDown = setInterval(() => {
            timeLeft--;
            
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;

            timerCount.textContent = 
                (minutes < 10 ? "0" + minutes : minutes) + ":" + 
                (seconds < 10 ? "0" + seconds : seconds);

            if (timeLeft <= 0) {
                clearInterval(countDown);
                timerText.style.display = 'none';
                resendBtn.style.display = 'inline-block';
            }
        }, 1000);
    </script>

@endsection