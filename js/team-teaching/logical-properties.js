/**
 * Direction control for the Logical Properties teaching demo.
 * Updates dir on .lp-compare-demo (and mirrors it onto [data-lp-flow]
 * subjects so headings, property labels, and pair layout can stay LTR).
 * Does not rewrite individual physical/logical styles.
 */
(() => {
    const demo = document.querySelector(".lp-compare-demo");
    const status = document.getElementById("lp-dir-value");
    const inputs = document.querySelectorAll('input[name="lp-direction"]');

    if (!demo || inputs.length === 0) {
        return;
    }

    const flowSubjects = demo.querySelectorAll("[data-lp-flow]");

    function applyDirection(dir) {
        demo.setAttribute("dir", dir);

        flowSubjects.forEach((el) => {
            el.setAttribute("dir", dir);
        });

        if (status) {
            status.textContent = dir;
        }
    }

    inputs.forEach((input) => {
        input.addEventListener("change", () => {
            if (input.checked) {
                applyDirection(input.value);
            }
        });
    });

    const initial = document.querySelector('input[name="lp-direction"]:checked');
    applyDirection(initial ? initial.value : "ltr");
})();
