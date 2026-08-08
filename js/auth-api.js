const API_URL = 'http://localhost:5000/api';

// دالة تسجيل الحساب (Signup)
async function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const phoneOrEmail = document.getElementById('phoneOrEmail').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, username, phoneOrEmail, password })
        });
        const data = await response.json();

        if (response.ok) {
            alert('تم إنشاء الحساب بنجاح! يرجى تسجيل الدخول.');
            window.location.href = 'login.html';
        } else {
            alert(data.error || 'حدث خطأ أثناء التسجيل');
        }
    } catch (err) {
        console.error(err);
        alert('تعذر الاتصال بالخادم');
    }
}

// دالة تسجيل الدخول (Login)
async function handleLogin(event) {
    event.preventDefault();
    const phoneOrEmail = document.getElementById('phoneOrEmail').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneOrEmail, password })
        });
        const data = await response.json();

        if (response.ok) {
            // حفظ الرمز وبيانات المستخدم في المتصفح
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = 'app.html';
        } else {
            alert(data.error || 'بيانات الدخول غير صحيحة');
        }
    } catch (err) {
        console.error(err);
        alert('تعذر الاتصال بالخادم');
    }
}
