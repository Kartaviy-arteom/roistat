const storage = window.localStorage;

export function loadEmployers() {
    const employers = storage.getItem('employers')
    return employers ? JSON.parse(employers) : [];
}

export function updateEmployers(employers) {
    storage.clear();
    storage.setItem('employers', JSON.stringify(employers));
}
