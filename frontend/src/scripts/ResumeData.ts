import type { fromJSON } from "postcss";

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

    static fromJSON(obj: any): ResumeExperience {
        const exp = new ResumeExperience();
        exp.id = obj.id;
        exp.title = obj.title;
        exp.sub_title = obj.subTitle,
        exp.time_period = obj.timePeriod,
        exp.location = obj.location,
        exp.visible = obj.visible,
        exp.skills_used = obj.skillsUsed,
        exp.bullet_points = [...(obj.bulletPoints ?? [])];
        return exp;
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

    static fromJSON(obj: any): ResumeSection {
        const sec = new ResumeSection();
        Object.assign(sec, obj);
        sec.experiences = (obj.experiences ?? []).map(ResumeExperience.fromJSON);
        return sec;
    }
}


export class ResumeData {
    public id : number;
    public name : string;
    public phone : string;
    public email : string;
    public github : string;
    public linkedin : string;
    public sections: ResumeSection[];
    
    constructor() {
        this.id = 1;
        this.name = '';
        this.phone = '';
        this.email = '';
        this.github = '';
        this.linkedin = '';
        this.sections = [];
    }

    static fromJSON(obj: any): ResumeData {
        const data = new ResumeData();
        Object.assign(data, obj);
        data.sections = (obj.sections ?? []).map(ResumeSection.fromJSON);
        return data;
    }
}