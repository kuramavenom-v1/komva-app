document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const currentTheme = Storage.getTheme() || 'light';

    if (darkModeToggle) {
        darkModeToggle.checked = currentTheme === 'dark';
        darkModeToggle.addEventListener('change', (e) => {
            const newTheme = e.target.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            Storage.setTheme(newTheme);
        });
    }
});
