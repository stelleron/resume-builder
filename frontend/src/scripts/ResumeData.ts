export class ResumeExperience {
    public id: number;
    public title: string;
    public sub_title: string;
    public time_period: string;
    public location: string;
    public bullet_points: string[];
    public visible: boolean;

    constructor() {
        this.id = 0;
        this.title = '';
        this.sub_title = '';
        this.time_period = '';
        this.location = '';
        this.bullet_points = [];
        this.visible = true;
    }
}

export class ResumeSection {
    public id: number;
    public name: string;
    public experiences: ResumeExperience[];
    public visible: boolean;

    constructor() {
        this.id = 0;
        this.name = ''
        this.experiences = [];
        this.visible = true;
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