var state = {
    character : null,
    kart      : null,
    tire      : null,
    glider    : null
};

export default state;

export function encode() {
    return atob(JSON.stringify(state));
}

export function decode() {
    var kart = location.hash;

    console.log(kart);

    try {
        state = JSON.parse(atob(kart));
    } catch(e) {
        // no-op for now
    }
}
