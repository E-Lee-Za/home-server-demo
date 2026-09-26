let requests = 0;
let lost = 0;

async function poll() {
    const controller = new AbortController();

    const timer = setTimeout(() => controller.abort(), 1500);
    try {
        const response = await fetch('/api/whoami', {cache: 'no-store', signal: controller.signal});
        if (!response.ok) throw new Error(response.status);
        const whoami = await response.json();

        switch(whoami.node) {
            case "pve-demo":
                document.getElementById("colour-box").style.background='#7B79D9';
                break;
            case "eleeza-debian":
                document.getElementById("colour-box").style.background='#F2D586';
                break;    
            case "eleeza-raspberrypi":
                document.getElementById("colour-box").style.background='#77CA7A';
                break;
            case "EleezaThinkpad":
                document.getElementById("colour-box").style.background='#DA494E';
                break;
            default:
                document.getElementById("colour-box").style.background='#A7959B';
        }

        //console.log(whoami.node);
        requests++;
        document.getElementById("hostname").textContent = whoami.node;

    } catch {
        requests++;
        lost++;

    } finally {
        setTimeout(poll, 1000);
        document.getElementById("req").textContent = requests.toString();
        document.getElementById("loss").textContent = lost.toString();
        clearTimeout(timer);
    }
    
}

poll();