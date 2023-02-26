(function () {
    //     "use strict";

    //     // horizontal direction
    //     (function resizableX() {
    //       const resizer = document.querySelector(".resizer-x");
    //       resizer.addEventListener("mousedown", onmousedown);
    //       resizer.addEventListener("touchstart", ontouchstart);

    //       // for mobile
    //       function ontouchstart(e) {
    //         e.preventDefault();
    //         resizer.addEventListener("touchmove", ontouchmove);
    //         resizer.addEventListener("touchend", ontouchend);
    //       }


    //       function ontouchmove(e) {
    //         e.preventDefault();
    //         const clientX = e.touches[0].clientX;
    //         const deltaX = clientX - (resizer._clientX || clientX);
    //         resizer._clientX = clientX;
    //         const l = resizer.previousElementSibling;
    //         const r = resizer.nextElementSibling;
    //         // LEFT
    //         if (deltaX < 0) {
    //           const w = Math.round(parseInt(getComputedStyle(l).width) + deltaX);
    //           l.style.flex = `0 ${w < 10 ? 0 : w}px`;
    //           r.style.flex = "1 0";
    //         }
    //         // RIGHT
    //         if (deltaX > 0) {
    //           const w = Math.round(parseInt(getComputedStyle(r).width) - deltaX);
    //           r.style.flex = `0 ${w < 10 ? 0 : w}px`;
    //           l.style.flex = "1 0";
    //         }
    //       }
    //       function ontouchend(e) {
    //         e.preventDefault();
    //         resizer.removeEventListener("touchmove", ontouchmove);
    //         resizer.removeEventListener("touchend", ontouchend);
    //         delete e._clientX;
    //       }

    //       // for desktop
    //       function onmousedown(e) {
    //         e.preventDefault();
    //         document.addEventListener("mousemove", onmousemove);
    //         document.addEventListener("mouseup", onmouseup);
    //       }
    //       function onmousemove(e) {
    //         e.preventDefault();
    //         const clientX = e.clientX;
    //         const deltaX = clientX - (resizer._clientX || clientX);
    //         resizer._clientX = clientX;
    //         const l = resizer.previousElementSibling;
    //         const r = resizer.nextElementSibling;
    //         // LEFT
    //         if (deltaX < 0) {
    //           const w = Math.round(parseInt(getComputedStyle(l).width) + deltaX);
    //           l.style.flex = `0 ${w < 10 ? 0 : w}px`;
    //           r.style.flex = "1 0";
    //         }
    //         // RIGHT
    //         if (deltaX > 0) {
    //           const w = Math.round(parseInt(getComputedStyle(r).width) - deltaX);
    //           r.style.flex = `0 ${w < 10 ? 0 : w}px`;
    //           l.style.flex = "1 0";
    //         }
    //       }
    //       function onmouseup(e) {
    //         e.preventDefault();
    //         document.removeEventListener("mousemove", onmousemove);
    //         document.removeEventListener("mouseup", onmouseup);
    //         delete e._clientX;
    //       }
    //     })();

    // vertical direction
    (function resizableY() {
        // ========= Resizer 1 ===========
        const resizer1 = document.querySelector(".resizer-y-1");
        resizer1.addEventListener("mousedown", onmousedown_1);
        // ========= Resizer 2 ===========
        const resizer2 = document.querySelector(".resizer-y-2");
        resizer2.addEventListener("mousedown", onmousedown_2);
        
        // for desktop
        function onmousedown_1(e) {
            e.preventDefault();
            document.addEventListener("mousemove", onmousemove_1);
            document.addEventListener("mouseup", onmouseup_1);
        }
        function onmousemove_1(e) {
            e.preventDefault();

            //! ========= Resizer 1 ===========
            const clientY_1 = e.clientY;
            const deltaY_1 = clientY_1 - (resizer1._clientY || clientY_1);
            resizer1._clientY = clientY_1;
            // ------------------------------------------------
            let mainHeight = document.getElementById('main_section').clientHeight;
            // let moveheight = ((resizer1._clientY-60) / (mainHeight-60)) * 100
            let moveheight = ((resizer1._clientY-60) / (mainHeight-60))
            // ------------------------------------------------
            const prevElement_1 = resizer1.previousElementSibling;
            const nextElement_1 = resizer1.nextElementSibling;
            // let prevHeight = (prevElement_1.clientHeight/(mainHeight-60))*100
            // let nextHeight = (nextElement_1.clientHeight/(mainHeight-60))*100
            let prevHeight = prevElement_1.clientHeight
            let nextHeight = nextElement_1.clientHeight
            console.log(prevHeight, nextHeight , moveheight)
            // UP
            if (deltaY_1 < 0) {
                // console.log(prevHeight)
                // let diffHeight = Math.abs(nextHeight-prevHeight)
                // console.log( nextHeight,prevHeight,diffHeight)
                // prevElement_1.style.height = moveheight + '%';
                // nextElement_1.style.height = (nextHeight ) + '%'
            }
            // DOWN
            if (deltaY_1 > 0) {
                // console.log('next', nextHeight)
                // let diffHeight = (moveheight-33.33)
                // prevElement_1.style.height = moveheight + '%';
                // nextElement_1.style.height = (33.33 - diffHeight) + '%'
            }

        }


        //------------ resizer 2
        function onmousedown_2(e) {
            e.preventDefault();
            document.addEventListener("mousemove", onmousemove_2);
            document.addEventListener("mouseup", onmouseup_2);
        }
        function onmousemove_2(e) {
            e.preventDefault();
            let main_section = document.getElementById('main_section')
            
            //! ========= Resizer 2 ===========
            const clientY_2 = e.clientY;
            const deltaY_2 = clientY_2 - (resizer2._clientY || clientY_2);
            resizer2._clientY = clientY_2;
            // ------------------------------------------------
            const prevElement_2 = resizer2.previousElementSibling;
            const nextElement_2 = resizer2.nextElementSibling;

            //=========== Move Percentage
            let moveHeight = ((resizer2._clientY-60) / (main_section.clientHeight-60)) * 100
            
            // console.log(moveHeight)
            let prevHeight = +prevElement_2.style.height.slice(0,-1)
            // UP
            if (deltaY_2 < 0) {
                // console.log(prevHeight)
                // prevElement_2.style.height = (moveHeight-33.33) + '%';
                // nextElement_2.style.height = (100-moveHeight) + '%'
            }
            // DOWN
            if (deltaY_2 > 0) {
                // prevElement_2.style.height = (prevHeight_2-33.33) + '%';
                // nextElement_2.style.height = (100-prevHeight_2) + '%'
            }

        }



        function onmouseup_1(e) {
            e.preventDefault();
            document.removeEventListener("mousemove", onmousemove_1);
            document.removeEventListener("mouseup", onmouseup_1);
            delete e._clientY;
        }
        function onmouseup_2(e) {
            e.preventDefault();
            document.removeEventListener("mousemove", onmousemove_2);
            document.removeEventListener("mouseup", onmouseup_2);
            delete e._clientY;
        }
    })();
})();