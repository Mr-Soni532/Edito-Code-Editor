export function resizerFunction() {

        // horizontal direction
        (function resizableX() {
          const resizer = document.querySelector(".resizer-x-1");
          resizer.addEventListener("mousedown", onmousedown);
          // for desktop
          function onmousedown(e) {
            e.preventDefault();
            document.addEventListener("mousemove", onmousemove);
            document.addEventListener("mouseup", onmouseup);
          }
          function onmousemove(e) {
            e.preventDefault();
            let mainWidth = document.getElementById('main_section').clientWidth;
            console.log(mainWidth)
            let movewidth = ((resizer._clientX) / (mainWidth)) * 100
            const clientX = e.clientX;
            const deltaX = clientX - (resizer._clientX || clientX);
            resizer._clientX = clientX;
            const l = resizer.previousElementSibling;
            const r = resizer.nextElementSibling;
            console.log(clientX)
            // LEFT
            if (deltaX < 0) {
                
            }
            // RIGHT
            if (deltaX > 0) {
               
            }
          }
          function onmouseup(e) {
            e.preventDefault();
            document.removeEventListener("mousemove", onmousemove);
            document.removeEventListener("mouseup", onmouseup);
            delete e._clientX;
          }
        })();

    // vertical direction
    (function resizableY() {
        // ========= Resizer 1 ===========
        const resizer1 = document.querySelector(".resizer-y-1");
        resizer1.addEventListener("mousedown", onmousedown_1);
        // ========= Resizer 2 ===========
        // const resizer2 = document.querySelector(".resizer-y-2");
        // resizer2.addEventListener("mousedown", onmousedown_2);
        
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
            let moveheight = ((resizer1._clientY-60) / (mainHeight)) * 100
            // let moveheight = ((resizer1._clientY-60) / (mainHeight-60))
            // ------------------------------------------------
            const prevElement_1 = resizer1.previousElementSibling;
            const nextElement_1 = resizer1.nextElementSibling;
            // let prevHeight = (prevElement_1.clientHeight/(mainHeight))*100
            // let nextHeight = (nextElement_1.clientHeight/(mainHeight))*100
            // UP
            console.log(moveheight)
            if (deltaY_1 < 0) {
                let diffHeight = (33.33 - moveheight)
                prevElement_1.style.height = moveheight + '%';
                nextElement_1.style.height = (33.33 + diffHeight) + '%'
            }
            // DOWN
            if (deltaY_1 > 0) {
                let diffHeight = (moveheight-33.33)
                prevElement_1.style.height = moveheight + '%';
                nextElement_1.style.height = (33.33 - diffHeight) + '%'
            }
        }

        function onmouseup_1(e) {
            e.preventDefault();
            document.removeEventListener("mousemove", onmousemove_1);
            document.removeEventListener("mouseup", onmouseup_1);
            delete e._clientY;
        }
    })();
};


export function resizerFunction_layout_3() {

        // horizontal direction
        (function resizableX() {
          const resizer = document.querySelector(".resizer-y-1");
          resizer.addEventListener("mousedown", onmousedown);
          // for desktop
          function onmousedown(e) {
            e.preventDefault();
            document.addEventListener("mousemove", onmousemove);
            document.addEventListener("mouseup", onmouseup);
          }
          function onmousemove(e) {
            e.preventDefault();
            let mainHeight = document.getElementById('main_section').clientHeight;
            let moveheight = ((resizer._clientY-60) / (mainHeight)) * 100
            const clientY = e.clientY;
            const deltaX = clientY - (resizer._clientY || clientY);
            resizer._clientY = clientY;
            const l = resizer.previousElementSibling;
            const r = resizer.nextElementSibling;
            console.log(clientY)
            if (deltaX < 0) {
                let diffHeight = (50 - moveheight)
                // l.style.height = moveheight + '%';
                // r.style.height = (50 + diffHeight) + '%'
            }
            // DOWN
            if (deltaX > 0) {
                let diffHeight = (moveheight-50)
                // l.style.height = moveheight + '%';
                // r.style.height = (50 - diffHeight) + '%'
            }
          }
          function onmouseup(e) {
            e.preventDefault();
            document.removeEventListener("mousemove", onmousemove);
            document.removeEventListener("mouseup", onmouseup);
            delete e._clientX;
          }
        })();
};
