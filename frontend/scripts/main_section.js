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
            // For getting the move direction
            const clientY = e.clientY;
            const deltaY = clientY - (resizer._clientY || clientY);
            resizer._clientY = clientY;
            // console.log(screen.height)
            const prevElement = resizer.previousElementSibling;
            const NextElement = resizer.nextElementSibling;
            console.log((resizer._clientY/screen.height)*100)
            // UP
            if (deltaY < 0) {
             
            }
            // DOWN
            if (deltaY > 0) {
            
            }
        }
        function onmouseup(e) {
            e.preventDefault();
            document.removeEventListener("mousemove", onmousemove);
            document.removeEventListener("mouseup", onmouseup);
            delete e._clientY;
        }
    })();
})();
