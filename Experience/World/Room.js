import * as THREE from "three"
import gsap from "gsap";
import Experience from "../Experience.js"
// import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        //console.log(this.room)
        this.actualRoom = this.room.scene;
        //console.log(this.actualRoom);
//        this.roomChildren = {};

       this.lerp = {
           current: 0,
           target: 0,
           ease: 0.1
       };

       this.setModel();
       //this.setAnimation();
       this.onMouseMove();
    }

    setModel(){
        this.actualRoom.children.forEach((child)=>{
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupChild)=>{
//                     console.log(groupChild.material);
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                });
            }

            //console.log(child);

            if(child.name === "fish_tank"){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0x279fdd);
                child.material.ior = 3;
                child.material.transmission = 0.9;
                child.material.opacity = 1;
                child.material.depthWrite = false;
                child.material.depthTest = false;
            }

            if(child.name === "computer001"){
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }

            // if(child.name === "Cube.021"){
            //     child.position.x = -0.289521;
            //     child.position.z = 8.83572;
            // }

//            child.scale.set(0,0,0);

//             if(child.name === "cube"){
//                 child.position.set(0,-1,0);
//                 child.rotation.y = Math.PI/4;
//             }

//             this.roomChildren[child.name.toLowerCase()] = child;
        });

        const width = 0.5;
        const height = 0.7;
         const intensity = 1;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
        );
        rectLight.position.set(7.68244, 7, 0.5);
        rectLight.rotation.x = -Math.PI /2;
        rectLight.rotation.z = Math.PI /4;
        //this.actualRoom.add(rectLight);

        //this.roomChildren["rectLight"] = rectLight;

        this.scene.add(this.actualRoom);
        //this.actualRoom.position.y = 0
        this.actualRoom.scale.set(0.11,0.11,0.11);
        //this.actualRoom.rotation.y = Math.PI;
    }

    // setAnimation(){
    //     this.mixer = new THREE.AnimationMixer(this.actualRoom);
    //     this.swim = this.mixer.clipAction(this.room.animations[2]);
    //     this.swim.play();
    //     //console.log(this.room);
    // }

    onMouseMove(){
        window.addEventListener("mousemove",(e)=>{
            //console.log(e);
            this.rotation = ((e.clientX-window.innerWidth/2) * 2) /window.innerWidth;
            //console.log(e.clientX,this.rotation);
            this.lerp.target = this.rotation*0.1;
        });
    }

    resize(){}

    update(){
        this.lerp.current = gsap.utils.interpolate(this.lerp.current,this.lerp.target,this.lerp.ease);

        this.actualRoom.rotation.y = this.lerp.current;
        //this.mixer.update(this.time.delta * 0.0009);
    }
        
}