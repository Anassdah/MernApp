<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->



<!-- PROJECT LOGO -->
<br />




<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project



As part of a learning process the main purpose of this project was to combine different cloud, devops and devweb technologies to se how they can be assembled in one project. With the use of gitlab CI/CD it was possible to automate the project using a MERN app with typescript into a GCP deployment environment. IN this README we try to assemble the key parts of this process.

### Built With

This section should list any major frameworks/libraries used to bootstrap this project. 


* <img src="https://cdn-icons-png.flaticon.com/512/919/919851.png" width="40" height="40" />  <b>React</b>
* <img src="https://cdn-icons-png.flaticon.com/512/919/919825.png" width="40" height="40" />  <b>Node.js</b>
* <img src="https://www.svgrepo.com/show/331488/mongodb.svg" width="40" height="40" />  <b>Mongodb</b>
* <img src="https://cdn-icons-png.flaticon.com/512/919/919832.png" width="40" height="40" />  <b>Typescript</b>
* <img src="https://cdn.changelog.com/uploads/icons/topics/EOj/icon_small.png?v=63684545612" width="40" height="40" />  <b>Ansible</b>
* <img src="https://icons-for-free.com/download-icon-Terraform-1329545833434920628_512.png" width="40" height="40" />  <b>Terraform</b>
* <img src="https://static-00.iconduck.com/assets.00/google-cloud-icon-512x412-8rnz6wkz.png" width="40" height="40" />  <b>Google Cloud Platform</b>
* <img src="https://cdn-icons-png.flaticon.com/512/919/919853.png" width="40" height="40" />  <b>Docker</b>


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

The first thing that we need to do is to make a gitlab runner available. In this project we created a VM in cloud stack using inria ci and we chose docker as an executor. For configuring the gitlab runner, it is better to refer to the official gitlab docs. For installing docker in our ubuntu VM follow docker official doc at https://docs.docker.com/engine/install/ubuntu/ There was some issues that we faced based on the inria.ci doc, the error was  Cannot connect to the Docker daemon at tcp://docker:2375/. Is the docker daemon running? and it was possible to fix them referring to this issue https://gitlab.com/gitlab-org/gitlab-runner/-/issues/27300, and following the official doc of Gitlab about docker in docker runner https://docs.gitlab.com/ee/ci/docker/using_docker_build.html#use-docker-socket-binding.   The runner is tagged as docker and we can see the configration of the runner at /etc/gitlab-runner/config.toml
``` 
[[runners]]
  name = "firstrunner"
  url = "https://gitlab.inria.fr/"
  id = 5833
  token = "zz_8o4gT5PYtTEUSssKy"
  token_obtained_at = 2023-03-21T20:18:58Z
  token_expires_at = 0001-01-01T00:00:00Z
  executor = "docker"
  [runners.cache]
    MaxUploadedArchiveSize = 0
  [runners.docker]
    tls_verify = false
    image = "docker:latest"
    privileged = true
    disable_entrypoint_overwrite = false
    oom_kill_disable = false
    disable_cache = false
    volumes = ["/certs/client","/cache"]
    shm_size = 0

```
Adding certs/client to volumes will probably fix the issue, as it is the case in the official doc of Gitlab.
### Provisioning infrastructure

We use terraform to provision the infrastructure, make sure to configure the vm insatnce correctly, it should be similiar whatever the cloud provider is, and make sure to configure the VM's network to have access to it. After double checking the settings we do:
  ```sh
  terraform init
  ```
  Then 

  ```sh
  terraform apply
  ```

The VM and all the related ressources should be created after this.

### Configuring the VM

Now we can use Ansible to correctly configure the VM, in order to run our application we use docker and docker-compose , so we need to install the related dependencies in our VM , we used ansible to keep track of everything we do in order to achieve that so that we can keep track of things if we want to scale up the project for example and have multiple VMs with the same set up. Ansible is not compatible with Windows , a work around in our case was to use Windows Subsystem for Linux (WSL), make sure to add the VM's IP address to the list of hosts, and then run the playbook.
```sh
  ansible-playbook ansible_test.yaml -i hosts.ini 
  ```

### Testing
We want to have a test stage for our pipeline, since it is not the purpose of this project we used react testing library to set up some basic integration and unitests that can be run using yarn install.
### Packaging
Make sure that your application is correctly configured, run it in your localhost to check that everything is working, in this case we can run the application via 
 ```sh
  docker-compose up
  ```
You can add -d option for detached mode. Our application consists of 3 containers, a frontend container, an api container and the mondo db container.
### CI/CD
We want to automate the different steps stated above that lead to deploying the application to google cloud, we therefore have 4 stages in our pipeline: build stage that will check that the code is correctly integrated , a test stage were we automate the testing process, a package stage were we build the docker containers and push them to docker hub and finally the deploy stage were we ssh to the GCP instance and run our containers. You can check the details in gitlab-ci.yml file. Make a change to your application and the pipeline will be triggered to automatically deploy changes.



 
