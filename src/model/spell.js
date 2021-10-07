class Spell {
    constructor(name, level, school, ritual, time, range, components, duration, classes, text, roll) {
        this.name = name;
        this.level = level;
        this.school = school;
        this.ritual = ritual;
        this.time = time;
        this.range = range;
        this.components = components;
        this.duration = duration;
        this.classes = classes;
        this.text = text;
        this.roll = (roll === undefined) ? "" : roll;
    }
}

module.exports = Spell;