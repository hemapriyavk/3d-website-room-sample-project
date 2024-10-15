import * as THREE from 'three';
import Experience from "../Experience.js";
import Room from "./Room.js";
import Floor from "./Floor.js";
import Environment from "./Environment.js";
import Controls from "./Controls.js";
//import Theme from "../Theme.js";
//import { EventEmitter } from "events";

export default class World /* extends EventEmitter */ {
    constructor(){
//         super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        //this.theme = this.experience.theme;

        this.resources.on("ready", ()=> {
           this.room = new Room();
            //console.log("created room");
           this.environment = new Environment();
           this.controls = new Controls();
           this.floor = new Floor();
//             this.emit("worldready");
        });


        //this.theme.on("switch", (theme) => {
          //  this.switchTheme(theme);
        //});
// /*
//         this.theme.on("switch", (theme) => {
//             this.switchTheme(theme);
//         }); */
    }

    //switchTheme(theme){
    //    if(this.environment){
    //        this.environment.switchTheme(theme);
    //    }
    //}

    

    resize(){}

    update(){
        if(this.room){
            this.room.update();
        }
//         if(this.controls){
//             this.controls.update();
//         }
    }
}