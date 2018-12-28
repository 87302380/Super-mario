function creatAnim(frames, frameLen) {
    return function resolveFrame(distance) {
        var frameIndex = Math.floor(distance / frameLen) % frames.length;
        var frameName = frames[frameIndex];

        return frameName;
    }
}