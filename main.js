const progressBars = document.querySelectorAll('.progress-bar');

// months as of April 14th 2022
const monthsBuildingWith = {
    "apps-script": 16.5,
    "css": 5,
    "jquery": 1,
    "react": 1,
    "sheets": 22,
    "js": 16,
    "git": 4,
    "html": 4,
    "sass": 1,
    "bootstrap": 1,
    "json": 1.5,
    "sql": 1,
    "python": 6.5,
    "node-js": 1
}

/*
 * if months > 6, max value
 * else, give value over 6
 * source: find psych source
 */
const fillBar = () => {
    let bars = [...progressBars];
    debugger;

    for (let bar of bars) {
        let id = bar.parentNode.parentNode.id;
        let months = monthsBuildingWith[id];
        let [percentage, mastery] = [
            months > 6 ? 100 : months/6,
            months > 6 ? 'Creative' :
                months >= 5 ? 'Confident' :
                months >= 3 ? 'Experienced' :
                months <= 1 ? 'Student' : 'Competent'
        ];
        // console.log(`Lang: ${id}\nMonths: ${months}\nLevel: ${mastery}`);

        bar.style.width = `${percentage}%`;
        bar.querySelector('.text').innerHTML = mastery;
    }
}

fillBar();