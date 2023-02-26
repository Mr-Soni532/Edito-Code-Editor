export default {
  props: ["mirror", "connected"],

  template: `
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand d-flex align-items-center" href="#">
                <img src="./public/assets/code.svg" width="30" class="mr-3 logo">
                <h6 class="ms-2 mb-0">Edito Playground</h6>
            </a>
            
            <div v-show="!connected" class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

            <div class="form-check form-switch">
                <label class="form-check-label text-white small">Mirror</label>
                <input class="form-check-input" type="checkbox" :checked="mirror" @click="$emit('toggle')">
                <a target="_blank" href="https://github.com/Mr-Soni532/sleepy-machine-4490"><img src="./public/assets/github.svg" class="ms-3"></a>
            </div>
        </div>
    </nav>
    `,
};
