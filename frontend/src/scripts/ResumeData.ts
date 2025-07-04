export class ResumeExperience {
    public id: number;
    public title: string;
    public sub_title: string;
    public skills_used: string;
    public time_period: string;
    public location: string;
    public bullet_points: string[];
    public visible: boolean;

    constructor() {
        this.id = 0;
        this.title = '';
        this.sub_title = '';
        this.skills_used = '';
        this.time_period = '';
        this.location = '';
        this.bullet_points = [];
        this.visible = true;
    }

    clone(): ResumeExperience {
        const copy = new ResumeExperience();
        copy.id = this.id;
        copy.title = this.title;
        copy.sub_title = this.sub_title;
        copy.skills_used = this.skills_used;
        copy.time_period = this.time_period;
        copy.location = this.location;
        copy.bullet_points = [...this.bullet_points]; // deep copy the array
        copy.visible = this.visible;
        return copy;
    }
}

export class ResumeSection {
    public id: number;
    public name: string;
    public experiences: ResumeExperience[];
    public visible: boolean;

    constructor() {
        this.id = 0;
        this.name = '';
        this.experiences = [];
        this.visible = true;
    }

    clone(): ResumeSection {
        const copy = new ResumeSection();
        copy.id = this.id;
        copy.name = this.name;
        copy.visible = this.visible;
        copy.experiences = this.experiences.map(exp => exp.clone()); // clone each experience
        return copy;
    }
}


export class ResumeData {
    public name : string;
    public phone : string;
    public email : string;
    public github : string;
    public linkedin : string;
    public sections: ResumeSection[];
    
    constructor() {
        this.name = '';
        this.phone = '';
        this.email = '';
        this.github = '';
        this.linkedin = '';
        this.sections = [];
    }
}