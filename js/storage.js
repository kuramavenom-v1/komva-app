class Storage {
    static setTheme(theme) {
        localStorage.setItem('komva_theme', theme);
    }
    static getTheme() {
        return localStorage.getItem('komva_theme');
    }
    static setSession(user) {
        localStorage.setItem('komva_user', JSON.stringify(user));
    }
    static getSession() {
        return JSON.parse(localStorage.getItem('komva_user'));
    }
    static clearSession() {
        localStorage.removeItem('komva_user');
    }
}
