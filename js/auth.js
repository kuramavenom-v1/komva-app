document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const togglePwd = document.getElementById('toggle-pwd');

    if (togglePwd) {
        togglePwd.addEventListener('click', () => {
            const pwdInput = document.getElementById('password');
            pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            // محاكاة تسجيل الدخول الناجح
            Storage.setSession({ email, name: "User" });
            window.location.href = 'app.html';
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = document.getElementById('password').value;
            const confirmPwd = document.getElementById('confirm-password').value;

            if (password !== confirmPwd) {
                alert("Passwords do not match!");
                return;
            }

            Storage.setSession({ email: document.getElementById('email').value, name: document.getElementById('name').value });
            window.location.href = 'app.html';
        });
    }
});
