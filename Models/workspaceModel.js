class workspaceModel{
    constructor({id,username,name,level,section,group,roll_start,roll_end,total,year,main,description}){
        this.id = id;
        this.username = username;
        this.name = name;
        this.level = level;
        this.section = section;
        this.group = group;
        this.roll_start = roll_start;
        this.roll_end = roll_end;
        this.total = total;
        this.year = year;
        this.main = main;
        this.description = description;
    }
}

module.exports = workspaceModel ;