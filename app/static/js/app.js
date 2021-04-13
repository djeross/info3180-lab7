/* Add your Application JavaScript */
// Instantiate our main Vue Instance
const uploadform= {
  name: 'upload-form',
  template: `
    <div class="card col-8">
    <h1>Upload Form</h1>
    <br>
    <div id="response">
    </div>
        <form @submit.prevent="uploadPhoto" method="post" enctype="multipart/form-data" id="uploadForm">
            <div class="form-group">
                <label for="description">Description</label>
                <textarea type="textArea" name="description" id="description" class="form-control" rows="4"></textarea>
            </div>
            <div class="form-group">
                <label for="photo">Photo</label>
                <input type="file" name="photo" id="photo" accept=".jpeg, .jpg, .png" class="form-control narrow">
            </div>
            <div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
  `,
    methods:{
        uploadPhoto() {
        let uploadForm = document.getElementById('uploadForm');
        let form_data = new FormData(uploadForm);
        let self = this;
        fetch("/api/upload", {
            method: 'POST',
            body: form_data,
            headers: {
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {
            // display a success message
            //let response =JSON.parse(jsonResponse);
            if (!(jsonResponse.message==undefined)){
                let element= `<div class="alert alert-success" role="alert">
                                ${jsonResponse.message}
                              </div>`;
                document.getElementById("response").innerHTML=element;
            }
            if (!(jsonResponse.errors==undefined)){
                let list=`<ul>`
                console.log(jsonResponse.errors);
                for (let index = 0; index < jsonResponse.errors.length; index++) {
                    const err = jsonResponse.errors[index];
                    console.log(err);
                    list=list.concat(`<li>${err}</li>`);
                }
                list=list.concat(`</ul>`);
                let element= `<div class="alert alert-danger" role="alert">
                                ${list}
                              </div>`;
                document.getElementById("response").innerHTML=element;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        }

    },
};

const Home = {
    name: 'Home',
    template: `
    <div class="jumbotron">
        <h1>Lab 7</h1>
        <p class="lead">In this lab we will demonstrate VueJS working with Forms and Form Validation from Flask-WTF.</p>
    </div>
    `,
    data() {
        return {}
    }
};

const app = Vue.createApp({
    data() {
        return {

        }
    },
    components: {
        'upload-from': uploadform,
        'Home':Home
    }
});

app.component('app-header', {
    name: 'AppHeader',
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Lab 7</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/upload">Upload<span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `
});

app.component('app-footer', {
    name: 'AppFooter',
    template: `
    <footer>
        <div class="container">
            <p>Copyright &copy; {{ year }} Flask Inc.</p>
        </div>
    </footer>
    `,
    data() {
        return {
            year: (new Date).getFullYear()
        }
    }
});



const NotFound = {
    name: 'NotFound',
    template: `
    <div>
        <h1>404 - Not Found</h1>
    </div>
    `,
    data() {
        return {}
    }
};


// Define Routes
const routes = [
    { path: "/", component: Home },
    // Put other routes here
    { path: "/upload", component: uploadform },

    // This is a catch all route in case none of the above matches
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
});

app.use(router);

app.mount('#app');