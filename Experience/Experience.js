import * as THREE from "three"

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets.js";

import Camera from "./Camera.js";
//import Theme from "./Theme.js";
// import Preloader from "./Preloader.js";
import Renderer from "./Renderer.js";

import World from "./World/World.js";
import Controls from "./World/Controls.js";

export default class Experience{
    static instance;
    constructor(canvas) {
        if(Experience.instance){
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        //console.log("Hello")
        this.scene = new THREE.Scene();
        this.sizes = new Sizes();
        this.time = new Time();
        this.camera = new Camera();
        //console.log(this.experience,this.sizes,this.scene,this.camera,this.canvas);
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.world = new World();
        //this.theme = new Theme();
//         this.preloader = new Preloader();

//         this.preloader.on("enablecontrols",()=>{
//             this.controls = new Controls();
//         });

        this.sizes.on("resize",()=>{
            this.resize();
        });

        this.time.on("update",()=>{
            this.update();
         });
    }

    resize(){
        this.camera.resize();
        this.renderer.resize();
        this.world.resize();
    }

    update(){
//         this.preloader.update();
        this.camera.update();
        this.renderer.update();
        this.world.update();
        if(this.controls){
            this.controls.update();
        }
    }
}