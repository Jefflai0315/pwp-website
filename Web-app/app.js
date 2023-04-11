console.log(Math.random())
// import * as THREE from 'three';
import * as THREE from './three.js';
import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';
import vertexShaderTao from './shaders/vertexShaderTao.glsl';
import fragmentShaderTao from './shaders/fragmentShaderTao.glsl';
import vertexShaderStoryTao from './shaders/vertexShaderStoryTao.glsl';
import fragmentShaderStoryTao from './shaders/fragmentShaderStoryTao.glsl';

import t1 from './images/storyBG2.jpg';
import t2 from './images/storyBG4.jpg';
import t3 from './images/storyBG3.jpg';
import t4 from './images/storyBG1.jpg';
import mask from './images/mask.png';

import wb0 from './images/workBG0.jpg';
import wb1 from './images/workBG1.jpg';
import wb2 from './images/workBG2.jpg';
import wb3 from './images/workBG3.jpg';

import b0 from './images/aboutBG0.jpg';
import b1 from './images/aboutBG1.jpg';
import b2 from './images/aboutBG2.jpg';
import b3 from './images/aboutBG3.jpg';
import maskBackground from './images/maskBackground.jpg';
import bg from './images/background.jpg';
import gsap from './gsap.min.js';

import { EffectComposer } from './three.js/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from './three.js/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from './three.js/examples/jsm/postprocessing/ShaderPass.js';
import { CurtainShader } from './effect1.js';
import { RGBAShader } from './effect2.js';
import { TestShader } from './effect3.js';
import { Vector2 } from './three.js/build/three.cjs';



const createInputEvents = require('simple-input-events');
export default class Sketch {
    constructor() {
        this.timeline1 = gsap.timeline();

        this.workTitles = ['<h1>Art Commission</h1>', '<h1>Art Commission</h1>', '<h1>Life on Wall</h1>', '<h1>Kick-Start the Year with a Sketch</hi>']
        this.workContents = ['<p> A unique and special way to show someone how much you care. 100% Handmade Portrait for your Loved Ones, Personalized Pastel Portrait, Black and White Custom Family love gift merged from your photos</p>', '<p> A unique and special way to show someone how much you care. 100% Handmade Portrait for your Loved Ones, Personalized Pastel Portrait, Black and White Custom Family love gift merged from your photos</p>', '<p>  "The essence and beauty of these magnificent creatures were captured in every stroke of the brush. From start to finish, the process was seamless and enjoyable."<br><b>-Samuel [Client] </b></p>', '<p> "Sketching is the preliminary step to the complete art. With the same accent, these sketches kick-start the year 2023 and drive the collaboration within the company. We hope we achieve a master piece by 2023 while deepening our connections." <br><b>- Jerzel [Client]</b></p>']
        this.WorkVideoSrc = ['https://www.youtube.com/watch?v=YtJEfTTD_Y4', 'https://www.youtube.com/watch?v=YtJEfTTD_Y4', 'images/elephant.mp4', 'images/workbg1.mp4']

        this.contentsTitle = ['Charming Lady ', 'Language Barier', 'Gift Exchange', 'Soldier and Mom']
        this.contents = ["<h1>A Charming Stranger</h1> <p>Walking through the Washington DC Museum, I spotted a young woman taking portrait of herself. Something about the woman caught my eye - perhaps it was the way she held herself with quiet confidence, or the sparkle in her eyes that suggested a deep well of inner strength. I drew out my pencil and start sketching. <br><br> A minute into the sketch, she packed up and was about to leave. I walked up to her and asked if I could help her finish a portrait as a way of complementing her charm. When the drawing was finished, the woman offered some tips and gave me a hug to thank me for the gift of her portrait. This really made my day!<br><br> I hope, through this sketch, I celebrated her uniqueness and reminded her of the power and beauty within herself. I am so pleased that I started appreciating people and their uniqueness through my art. From that day on, this becomes my mission to seek out people whose stories and personalities inspired me, offering them a gift of their portrait as a way of celebrating their individuality and success. And as I continued to create, I found that my own life was enriched by the connections I made and the stories I learned through my art.</p>",
            "<h1>Defying Language Barier</h1> <p>Mana had always been a lover of art, but when she stumbled upon a particular artist's work, she was utterly enamored. She found out that I had come to Japan to explore and draw its people. Mana knew she had to meet me, to see the magic behind my art with her own eyes. So she texted me. I replied 'let's go for a coffee' - that's how we met.<br><br> Mana asked me if I would be willing to let her show me around Japan, to share the beauty and wonder of the country. I did not hesitate. Mana brought along her daughter whose name is Cocona. She was shy as we met. But as we traveled, Cocona began to open up to me, sharing her food with me eventhough we both don't know each other languages.<br><br>Before I finished my journey through Japan, I left Mana and Cocona with a parting gift - a portrait I had drawn of them, capturing their warmth and spirits. Mana was moved to tears, she shared that she was feeling a deep sense of gratitude for my presence in their life.<br><br>I hope years later, we will meet again, but speak in a common language this time. That was the moment when we both had discovered the power of art to bring people together and celebrate the beauty of life. Thank you for inspiring me to see the world through fresh eyes and find joy in the connections between strangers.</p>",
            "<h1>A Gift For Me</h1> <p>As the plane took off, I tried to relax by watching a movie. But something caught my eye - the flight attendant serving my row had an incredibly kind and helpful demeanor. She seemed to anticipate the passengers' needs before they even asked, and I couldn't help but notice the fatigue behind her smile.<br><br>I reached into my backpack and pulled out a sketchbook and pencil to sketch her likeness on the page, trying my best to capture her kind spirit and beauty. I then approached the flight attendant in the cabin resting area. She was surprised to see me. Her eyes widened in amazement and those eyers were smiling brightly.<br><br>To my surprise, the flight attendant returned with a small gift - a drawing of me as an anime character, complete with exaggerated features. She also gave me a bag of snacks to take with me on my journey. I felt a sense of warmth and connection. The feeling of making a small impact on the life of someone is so rewarding. Thank you! I wish I knew your name... </p>",
            "<h1>She is a Soldier and a Mother</h1> <p> I spotted a female soldier in JEWEL (Singapore Airport) on the valentine day. She was spending her time with her son, having ice cream together infront of the beautiful indoor waterful. As I sat right infront of them, I can't help but thinking how difficult it is to raise a kid while she have to serve the nation. It was a heart warming sight. I quickly made a sketch for them on this special occasion to show her appreciation and made her felt cared for.<br><br> From drawing strangers, I learned the importance of taking a moment to appreciate the small things in life, such as enjoying an ice cream with your child on a walk. It's easy to get caught up in the stress of everyday life, especially for someone serving in the army, but taking a moment to appreciate the present can bring a sense of peace and joy.<br><br>I hope acts of kindness like this can have a ripple effect, inspiring others to do the same and creating a more compassionate and empathetic world. It's a reminder to us all to take the time to appreciate and uplift those around us, even in small ways. It's nice to be the one spreading positivity and happiness. I believe there are more people who does the same in their own unique ways! </p>"]
        this.contentVideoUrl = ["https://www.youtube.com/embed/KQUzKO63v3M", "https://www.youtube.com/embed/LJbPLCDr3-g", "https://www.youtube.com/embed/xdve2d5j_MU", "https://www.youtube.com/embed/fw3TBow56QQ?start=36"]
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container = document.getElementById('container').appendChild(this.renderer.domElement);


        // for progress circle
        this.items = 4
        this.projectIndex = document.getElementById('projectIndex');
        this.totalOffset = 628.4;
        this.currentOffset = this.totalOffset
        this.strokeDashoffsetSteps = this.totalOffset / this.items;

        // for transition effect and shaders
        this.move = 0;
        this.time = 0;
        this.transition = 0;
        this.current = 0;
        this.startScroll = 0;


        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);
        this.camera.position.y = 0;
        this.camera.position.z = 1500;
        this.camera.aspect = window.innerWidth / window.innerHeight

        this.scene = new THREE.Scene();
        this.raycaster = new THREE.Raycaster();
        this.event = createInputEvents(this.renderer.domElement);
        this.mouse = new THREE.Vector2();
        this.point = new THREE.Vector2();
        this.storyButton = document.getElementById('story-button');
       
        this.mouseBackground = new THREE.Vector2();
        this.mouseBackgroundTarget = new THREE.Vector2();





        //plane for story background: grunge style
        this.PlaneGeometry = new THREE.PlaneGeometry(3840, 2160, 1, 1);
        this.bgTexture = new THREE.TextureLoader().load(bg);
        this.plane = new THREE.Mesh(this.PlaneGeometry, new THREE.MeshBasicMaterial({ map: this.bgTexture, side: THREE.DoubleSide, opacity: 0.5, transparent: true }));
        this.plane.position.y = 1080 * 1.5;
        this.plane.position.z = -500;
        this.scene.add(this.plane);


        //add a 50% transparent plane to the scene at position -1080 
        this.plane = new THREE.PlaneGeometry(1980 * 1.5, 1020 * 1.5, 1, 1);
        this.planeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.55 });
        this.planeMesh = new THREE.Mesh(this.plane, this.planeMaterial);
        this.planeMesh.position.y = -1080 * 1.5;
        this.scene.add(this.planeMesh);



        this.workBG = [wb0, wb1, wb2, wb3]
        this.workBG = this.workBG.map((img) => new THREE.TextureLoader().load(img))


        // background transition effect with yuri artiukh
        this.background = [b0, b1, b2, b3]
        this.background = this.background.map((img) => new THREE.TextureLoader().load(img))
        this.maskBackground = new THREE.TextureLoader().load(maskBackground);
        this.geometryBackground = new THREE.PlaneGeometry(1920 * 1.2, 1080 * 1.2, 1, 1);
        this.groups = [];
        this.background.forEach((img, j) => {
            let group = new THREE.Group();
            this.scene.add(group);
            this.groups.push(group);
            for (let i = 0; i < 3; i++) {
                let material = new THREE.MeshBasicMaterial({ map: img });

                if (i > 0) {
                    material = new THREE.MeshBasicMaterial({ map: img, alphaMap: this.maskBackground, transparent: true });
                }

                let mesh = new THREE.Mesh(this.geometryBackground, material);
                mesh.position.z = (i + 1) * 200;
                group.add(mesh);
                group.position.x = j * 1920 * 1.2;
            }
        })
        //----------------------------------------------------------------

        // people cutout photos
        this.textures = [
            new THREE.TextureLoader().load(t1),
            new THREE.TextureLoader().load(t2),
            new THREE.TextureLoader().load(t3),
            new THREE.TextureLoader().load(t4)
        ]
        for (let i = 0; i < this.textures.length; i++) {
            this.textures[i].wrapS = THREE.ClampToEdgeWrapping;
            this.textures[i].wrapT = THREE.ClampToEdgeWrapping;
        }
        this.mask = new THREE.TextureLoader().load(mask);

        // !!navigation bar state change
        const tabs = document.querySelectorAll('.tab');
        tabs.forEach(clickedTab => {
            // Add onClick event listener on each tab
            clickedTab.addEventListener('click', () => {
                // Remove the active class from all the tabs (this acts as a "hard" reset)
                tabs.forEach(tab => {
                    tab.classList.remove('active');
                });

                // Add the active class on the clicked tab
                clickedTab.classList.add('active');
                const clickedTabBGColor = getComputedStyle(clickedTab).getPropertyValue('color');
                document.body.style.background = clickedTabBGColor;


                // update background animation 
                if (clickedTab.id == "story") {
                    this.goToStory()
                } else if (clickedTab.id == "about-me-btn") {
                    this.goToAbout()
                }
                else if (clickedTab.id == "work") {
                    this.goToWork()
                }
            });
        });
        //----------------------------------------------------------------
        this.addTao();
        // this.addTaoStory();
        // this.mouseEffects();
        this.addMesh();
        this.events();
        this.initPost();
        let backgroundAnim = setInterval(() => {
            if (this.camera.position.y == 0) {
                this.runAnimation()
            }
        }, 6000);
        console.log(Math.random(),'inside')
        
        
        this.render();
    }
    getMobileOS() {
        const ua = navigator.userAgent
        if(/android/i.test(ua)) {
          return "Android"
        }
        else if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)){
            // alert("Please select")
          return "iOS"
        }
        return "Other"
      }

    addTao() {
        //taotajima.jp transition
        this.taoPlane = new THREE.PlaneGeometry(1920 * 1.2, 1080 * 1.2, 1, 1);
        this.taoMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { type: 'f', value: 0 },
                pixels: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                progress: { type: 'f', value: 0 },
                uxRate1: {
                    value: new THREE.Vector2(1, 1)
                },
                accel: { type: 'v2', value: new THREE.Vector2(0.5, 2) },
                b0: { type: 't', value: this.workBG[0] },
                b1: { type: 't', value: this.workBG[1] },
            },
            vertexShader: vertexShaderTao,
            fragmentShader: fragmentShaderTao,
        })
        this.tao = new THREE.Mesh(this.taoPlane, this.taoMaterial);
        this.tao.position.y = -1080 * 1.5;
        this.scene.add(this.tao);
        console.log('addtao')
    }

    addTaoStory() {
        //taotajima.jp transition
        this.taoStoryPlane = new THREE.PlaneGeometry(1920 * 1.2, 1080 * 1.2, 1, 1);
        this.taoStoryMaterial = new THREE.ShaderMaterial({
            uniforms: {
                time: { type: 'f', value: 0 },
                pixels: { type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                progress: { type: 'f', value: 0 },
                uxRate1: {
                    value: new THREE.Vector2(1, 1)
                },
                accel: { type: 'v2', value: new THREE.Vector2(0.5, 2) },
                b0: { type: 't', value: this.workBG[0] },
                b1: { type: 't', value: this.workBG[1] },
            },
            vertexShader: vertexShaderStoryTao,
            fragmentShader: fragmentShaderStoryTao,
        })
        this.storyTao = new THREE.Mesh(this.taoStoryPlane, this.taoStoryMaterial);
        this.storyTao.position.y = +1080 * 1.5;
        this.scene.add(this.storyTao);
        console.log('addstorytao')
    }

    events() {
        this.event.on('move', ({ uv }) => {
            this.mouseBackground.x = uv[0] - 1.
            this.mouseBackground.y = uv[1] - 0.8
        }
        )
    }

    // transtiion effect
    initPost() {
        this.composer = new EffectComposer(this.renderer);
        const renderPass = new RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);

        this.effectPass = new ShaderPass(CurtainShader);
        this.composer.addPass(this.effectPass);

        this.effectPass1 = new ShaderPass(RGBAShader);
        this.composer.addPass(this.effectPass1);

        this.effectPass2 = new ShaderPass(TestShader);
        this.composer.addPass(this.effectPass2);

        this.composer.setSize(window.innerWidth, window.innerHeight);

    }
    // animate progress circle
    animateSvg() {
        const scrollPosition = window.scrollY;
        let scrollRatio = (this.move / 628.4);
        scrollRatio = Math.max(scrollRatio, 0);
        scrollRatio = Math.min(scrollRatio, 1);
        for (const path of document.querySelectorAll('svg path')) {
            // Min & Max can be hardcoded to fit your use-case
            const dashOffsetMin = 0;
            const dashOffsetMax = path.getTotalLength();
            const dashOffsetRange = dashOffsetMax
                - dashOffsetMin;
            // Set stroke-dashoffset
            path.style.strokeDashoffset = dashOffsetMin
                + dashOffsetRange * scrollRatio * 155;

            this.projectIndex.setAttribute("data-percent", this.contentsTitle[Math.round(this.current)]);
        }
    }
    goToWork() {

        let t1 = gsap.timeline();
        t1.to(this.camera.position, {
            y: -1080 * 1.5,
            duration: 1.5,
            ease: "power4.inOut",
        })
        t1.to(this.camera.position, {
            z: 800,
            duration: 1,
            ease: "power4.inOut",
        }, 0)
        t1.to(this.camera.position, {
            z: 1500,
            duration: 0.5,
            ease: 'power3.inOut',
        }, 1)
    }

    goToStory() {
        let t1 = gsap.timeline();
        t1.to(this.camera.position, {
            y: 1080 * 1.5,
            duration: 1.5,
            ease: "power4.inOut",
        })

        t1.to(this.camera.position, {
            x: 0,
            duration: 2.,
            ease: "power4.inOut",
        }, 0)



    }

    goToAbout() {


        let t1 = gsap.timeline();
        t1.to(this.camera.position, {
            y: 0,
            duration: 1.5,
            ease: "power4.inOut",
        })
    }

    runStoryAnimation() {

        let t1 = gsap.timeline();
        t1.to(this, {
            transition: 0,
            duration: 1,
            ease: "power4.inOut",
        })

        document.getElementsByClassName('progress')[0].classList.remove('animate-in')
        document.getElementsByClassName('progress')[0].classList.add('animate-out')
        this.storyButton.classList.remove('animate-out')
        this.storyButton.classList.add('animate-in')

    }

    runScrollingAnimation() {
        this.transition = 30
    }


    //about page background transition
    runAnimation() {
        let t1 = gsap.timeline();
        t1.to(this.camera.position, {
            x: (this.camera.position.x + (1920 * 1.2)) % (1920 * 4.8),
            duration: 1.5,
            ease: "power4.inOut",
        }, 0)

        t1.to(this.camera.position, {
            z: 1000,
            duration: 1,
            ease: "power4.inOut",
        }, 0)
        t1.to(this.camera.position, {
            z: 1500,
            duration: 1,
            ease: "power4.inOut",
        }, 1)

        t1.to(this.effectPass.uniforms.uProgress, {
            value: 1,
            duration: 1,
            ease: "power3.inOut",
        }, 0)
        t1.to(this.effectPass.uniforms.uProgress, {
            value: 0,
            duration: 1,
            ease: "power3.inOut",
        }, 1)
        t1.to(this.effectPass1.uniforms.uProgress, {
            value: 1,
            duration: 1,
            ease: "power3.inOut",
        }, 0)
        t1.to(this.effectPass1.uniforms.uProgress, {
            value: 0,
            duration: 1,
            ease: "power3.inOut",
        }, 1)

    }


    // calculate position and attribute to shader: STORY
    addMesh() {
        this.material = new THREE.ShaderMaterial({
            fragmentShader: fragment,
            vertexShader: vertex,
            uniforms: {
                progress: { type: 'f', value: 0 },
                move: { type: 'f', value: 0 },
                time: { type: 'f', value: 0 },
                t1: { type: 't', value: this.textures[0] },
                t2: { type: 't', value: this.textures[1] },
                t3: { type: 't', value: this.textures[2] },
                t4: { type: 't', value: this.textures[3] },
                mask: { type: 't', value: this.mask },
                mouse: { type: 'v2', value: null },
                transition: { type: 'f', value: 0 },

            },
            side: THREE.DoubleSide,
            transparent: true,
            // depthTest: false,
            depthWrite: false,
        })

        this.geometry = new THREE.BufferGeometry();
        // attributes for vertex shader
        let number = 512 * 512;
        this.position = new THREE.BufferAttribute(new Float32Array(number * 3), 3);
        this.coordinates = new THREE.BufferAttribute(new Float32Array(number * 3), 3);
        this.offset = new THREE.BufferAttribute(new Float32Array(number), 1);
        this.speeds = new THREE.BufferAttribute(new Float32Array(number), 1);
        this.direction = new THREE.BufferAttribute(new Float32Array(number), 1);
        this.press = new THREE.BufferAttribute(new Float32Array(number), 1);

        function rand(a, b) {
            return a + (b - a) * Math.random();
        }

        let index = 0;
        for (let i = 0; i < 512; i++) {
            let posX = i - 256;
            for (let j = 0; j < 512; j++) {
                this.position.setXYZ(index, posX * 3, (j - 256) * 3 + 1080 * 1.5, 0);
                this.coordinates.setXYZ(index, i, j, 0);
                this.offset.setX(index, rand(-1000, 1000));
                this.speeds.setX(index, rand(0.4, 2));
                this.direction.setX(index, Math.random() > 0.8 ? 1 : -1);
                this.press.setX(index, rand(0.4, 1));
                index++;
            }
        }
        this.geometry.setAttribute('position', this.position);
        this.geometry.setAttribute('aCoordinates', this.coordinates);
        this.geometry.setAttribute('aOffset', this.offset);
        this.geometry.setAttribute('aSpeed', this.speeds);
        this.geometry.setAttribute('aPress', this.press);
        this.geometry.setAttribute('aDirection', this.direction);
        this.mesh = new THREE.Points(this.geometry, this.material);
        this.mouseEffects();

        this.scene.add(this.mesh);
    }

    // HTML content for specified project
    addContent(index) {
        document.getElementById('content-text').innerHTML = '';
        document.getElementById('content-text').innerHTML += this.contents[index]
    }

    lerp(start, end, amt) {
        return (1 - amt) * start + amt * end
    }


    mouseEffects() {
        this.test = new THREE.Mesh(
            new THREE.PlaneGeometry(1000, 1000), new THREE.MeshBasicMaterial({ color: 0x000000 })
        )
        this.test.position.y = 1080 * 1.5
        this.test.position.z = -800
        this.scene.add(this.test)
        // var isScrolling;
        var endScroll;
        var endScroll2;
        var endScroll3;
        // var done;
        // let object = document.getElementById('main-button')

        // function call once when 
        window.addEventListener('resize', () => {
            var w = window.innerWidth;
            var h = window.innerHeight;
            this.renderer.setSize(w, h);
            this.composer.renderer.setSize(w, h);
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
        })

        if(this.getMobileOS()=="iOS"){
            this.scrollDirection = 1
            this.isScrolling = 0
            this.scrollInertia = 0
            window.addEventListener('scroll',()=>{
                this.isScrolling = 1;
                this.scrollInertia = 0.8;
                if (window.pageYOffset>0){
                    this.scrollDirection = -1
                } else{
                    this.scrollDirection = 1
                }
                console.log(window.pageYOffset)
                // this.move = window.pageYOffset/10
                // console.log(window.pageYOffset,'pageyoffset')
                if (document.getElementById('content').style.display != 'flex' && document.getElementById('work-individual').style.display == 'none') {
                    
                    // this.move += (Math.log(1 + (window.page) / 1000)) / (Math.log(100));
                    // this.move = window.pageYOffset
                    // this.storyButton.innerHTML = this.contentsTitle[this.current];
                    this.storyButton.classList.remove('animate-in');
                    this.storyButton.classList.add('animate-out')
                    this.runScrollingAnimation();
                    // document.getElementById('content').style
                    if (document.getElementsByClassName('progress')[0].classList.contains("animate-out")) {
                        document.getElementsByClassName('progress')[0].classList.remove('animate-out')
                        document.getElementsByClassName('progress')[0].classList.add('animate-in')
                    }
                    window.clearTimeout(endScroll);
                    window.clearTimeout(endScroll2);
            

                    endScroll = setTimeout(() => this.runStoryAnimation(), 300)
                    endScroll2 = setTimeout(function () {


                        let round = Math.round(this.move);
                        this.timeline1.to(this, { move: round })

                        let scrollRatio = (round / 628.4);
                        scrollRatio = Math.max(scrollRatio, 0);
                        scrollRatio = Math.min(scrollRatio, 1);
                        for (const path of document.querySelectorAll('svg path')) {
                            // Min & Max can be hardcoded to fit your use-case
                            const dashOffsetMin = 0;
                            const dashOffsetMax = path.getTotalLength();
                            const dashOffsetRange = dashOffsetMax
                                - dashOffsetMin;
                            // Set stroke-dashoffset
                            this.timeline1.to(path.style, {
                                strokeDashoffset: dashOffsetMin
                                    + dashOffsetRange * scrollRatio * 155,
                                duration: 0.1,
                            });
                            round = round % 4
                            this.projectIndex.setAttribute("data-percent", this.contentsTitle[round]);
                            // this.storyButton.innerHTML = this.contentsTitle[round]
                        }

                    }.bind(this), 200)


                    this.animateSvg();


                } else if (document.getElementById('content').style.display != 'flex') {
                    // this.move += (Math.log(1 + (e.wheelDeltaY) / 1000)) / (Math.log(100));
                    // this.move = window.pageYOffset
                    let i = Math.round(this.move) % 4
                    document.getElementById('work-content-individual').querySelector('p').innerHTML = this.workTitles[i]
                    document.getElementById('work-content-individual').querySelector('p').innerHTML += this.workContents[i]

                }
                clearTimeout(endScroll3)
                endScroll3 = setTimeout(function() {
                    this.isScrolling = 0
                    console.log('false')
                }.bind(this),100)
                console.log('true')
                

            },false)
        }else {window.addEventListener('mousewheel', (e) => {
            console.log(this.move,'wheelDeltaY')

            if (document.getElementById('content').style.display != 'flex' && document.getElementById('work-individual').style.display == 'none') {
                
                this.move += (Math.log(1 + (e.wheelDeltaY) / 1000)) / (Math.log(100));
                // this.storyButton.innerHTML = this.contentsTitle[this.current];
                this.storyButton.classList.remove('animate-in');
                this.storyButton.classList.add('animate-out')
                this.runScrollingAnimation();
                // document.getElementById('content').style
                if (document.getElementsByClassName('progress')[0].classList.contains("animate-out")) {
                    document.getElementsByClassName('progress')[0].classList.remove('animate-out')
                    document.getElementsByClassName('progress')[0].classList.add('animate-in')
                }
                window.clearTimeout(endScroll);
                window.clearTimeout(endScroll2);
        

                endScroll = setTimeout(() => this.runStoryAnimation(), 300)
                endScroll2 = setTimeout(function () {


                    let round = Math.round(this.move);
                    this.timeline1.to(this, { move: round })

                    let scrollRatio = (round / 628.4);
                    scrollRatio = Math.max(scrollRatio, 0);
                    scrollRatio = Math.min(scrollRatio, 1);
                    for (const path of document.querySelectorAll('svg path')) {
                        // Min & Max can be hardcoded to fit your use-case
                        const dashOffsetMin = 0;
                        const dashOffsetMax = path.getTotalLength();
                        const dashOffsetRange = dashOffsetMax
                            - dashOffsetMin;
                        // Set stroke-dashoffset
                        this.timeline1.to(path.style, {
                            strokeDashoffset: dashOffsetMin
                                + dashOffsetRange * scrollRatio * 155,
                            duration: 0.1,
                        });
                        round = round % 4
                        this.projectIndex.setAttribute("data-percent", this.contentsTitle[round]);
                        // this.storyButton.innerHTML = this.contentsTitle[round]
                    }

                }.bind(this), 200)


                this.animateSvg();


            } else if (document.getElementById('content').style.display != 'flex') {
                this.move += (Math.log(1 + (e.wheelDeltaY) / 1000)) / (Math.log(100));
                let i = Math.round(this.move) % 4
                document.getElementById('work-content-individual').querySelector('p').innerHTML = this.workTitles[i]
                document.getElementById('work-content-individual').querySelector('p').innerHTML += this.workContents[i]

            }

        }, false);}







        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
            this.raycaster.setFromCamera(this.mouse, this.camera);
            try {

                var intersects = this.raycaster.intersectObjects([this.test]);

                this.point.x = intersects[0].point.x;
                this.point.y = intersects[0].point.y;
            } catch { }
        }, false);



        this.storyButton.addEventListener('click', (event) => {
            document.getElementById('story-iframe').src = this.contentVideoUrl[this.current]
            if (document.getElementById('content').style.display !== 'flex') {


                document.getElementById('block').style.display = 'none'
                this.addContent((this.current + 4) % 4);
                this.storyButton.classList.remove('animate-in');
                this.storyButton.classList.add('animate-out');
                document.getElementById('content').style.display = 'flex';
                document.getElementById('content').classList.add('animate-in')
            }
            setTimeout(() => {
                this.storyButton.style.display = 'none';
            }, 100);
        })

        let aboutMeBtn = document.getElementById('about-me-btn')
        aboutMeBtn.addEventListener('click', function () {

            // aboutMeBtn.style.display = 'block'
            aboutMeBtn.classList.remove('animate-out')
            aboutMeBtn.classList.add('animate-in')
        })

        let closeStoryBtn = document.getElementsByClassName('close-story-btn')[0]
        closeStoryBtn.addEventListener('click', function () {

            document.getElementById('story-iframe').src = this.contentVideoUrl[this.current]
        }.bind(this))
    }



    render() {
        this.time++;

        if (this.isScrolling){
            this.scrollInertia -= 0.03
            if (this.scrollInertia<0){this.scrollInertia=0;}
            console.log((this.move))
            this.move += (0.0275 *this.scrollDirection*(this.scrollInertia))
        }


        // breathing effect of background
        this.oscilator = Math.sin(this.time / 200) * 0.5 + 0.5;

        this.groups.forEach((group) => {
            this.mouseBackgroundTarget.lerp(this.mouseBackground, 0.1);
            group.rotation.x = -this.mouseBackgroundTarget.y * 0.1;
            group.rotation.y = -this.mouseBackgroundTarget.x * 0.1;

            group.children.forEach((child, i) => {
                child.position.z = (i) * 120 - i * this.oscilator * 50;
            })
        });
        //-------------------------



        if (document.getElementById('work-individual').style.display == 'flex') {

            let diff = Math.round(this.move) - this.move
            this.move += diff * 0.03
            if (Math.abs(diff) < 0.001) {
                this.move = Math.round(this.move)
            }
            this.move = Math.abs((this.move + 4) % 4)

        } else {
            this.move = Math.abs((this.move + 4) % 4)
        }
        this.current = Math.floor(this.move) % 4
        let next = (Math.floor(this.move) + 5) % 4;



        this.material.uniforms.t1.value = this.textures[this.current];
        this.material.uniforms.t2.value = this.textures[next];
        this.material.uniforms.time.value = this.time;
        this.material.uniforms.transition.value = this.transition;
        this.material.uniforms.move.value = this.move;
        this.material.uniforms.mouse.value = this.point;


        // this.taoStoryMaterial.uniforms.progress.value = (this.move % 1);
        // this.taoStoryMaterial.uniforms.time.value = this.time;
        // this.taoStoryMaterial.uniforms.b0.value = this.workBG[this.current];
        // this.taoStoryMaterial.uniforms.b1.value = this.workBG[next];

        this.taoMaterial.uniforms.progress.value = (this.move % 1);
        this.taoMaterial.uniforms.time.value = this.time;

        this.taoMaterial.uniforms.b0.value = this.workBG[this.current];
        this.taoMaterial.uniforms.b1.value = this.workBG[next];
        this.composer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render.bind(this));
        console.log(this.move)



    }
}

new Sketch()