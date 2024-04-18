export default function smallDeviceDetected() {
    const smallDevice = global.window && !window.matchMedia("(min-width: 640px)").matches;

    return smallDevice;
}
