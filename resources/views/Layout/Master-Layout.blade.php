<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gradient Card - Label Fix</title>

  <link href="{{ asset('Assets/css/bootstrap.min.css') }}" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('Assets/fontawesome/css/all.min.css') }}">
  <link rel="stylesheet" href="{{ asset('Assets/css/style.css') }}">

</head>
<body>

    @if(session('error') || session('success'))
        <div id="toast-container" class="toast-container">
            <div class="custom-toast {{ session('error') ? 'toast-error' : 'toast-success' }}">
                <div class="toast-content">
                    <span class="toast-icon">
                        {!! session('error') ? '&#9888;' : '&#10004;' !!}
                    </span>
                    <span class="toast-msg">{{ session('error') ?? session('success') }}</span>
                </div>
                <div class="progress-bar"></div>
            </div>
        </div>
    @endif

    @yield('Content')
    
  <script src="{{ asset('Assets/js/bootstrap.bundle.min.js') }}"></script>
  <script>
      document.addEventListener('DOMContentLoaded', function() {
          const toast = document.querySelector('.custom-toast');
          if (toast) {
              // ৫ সেকেন্ড (৫০০০ মিলি-সেকেন্ড) পর হাইড হবে
              setTimeout(() => {
                  toast.style.animation = 'slideOut 0.5s ease-in forwards';
                  setTimeout(() => {
                      toast.remove();
                  }, 500); // অ্যানিমেশন শেষ হওয়ার পর ডিলিট হবে
              }, 5000);
          }
      });
  </script>
</body>
</html>