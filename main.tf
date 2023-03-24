terraform {
  required_providers {
    #Cloud provider
    google = {
      source  = "hashicorp/google"
      version = "4.51.0"
    }
  }
}

provider "google" {
  credentials = file(var.credentials)

  project = "anassproject"
  region  = var.region
  zone    = var.zone
}
#allow ssh
resource "google_compute_firewall" "ssh-rule" {
  name = "demo-ssh"
  network = google_compute_network.vpc_network.name
  allow {
    protocol = "tcp"
    ports = ["22"]
  }
  target_tags = ["terraform-instance"]
  source_ranges = ["0.0.0.0/0"]
}
resource "google_compute_firewall" "default" {
  name    = "tf-www-firewall"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["80"]
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["terraform-instance"]
}

resource "google_compute_firewall" "allow_ssh" {
  name    = "allow-ssh"
  network = google_compute_network.vpc_network.self_link

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = ["0.0.0.0/0"]
}
#Create VPN
resource "google_compute_network" "vpc_network" {
  name = "terraform-network"
}
#Create VM instance
resource "google_compute_instance" "vm_instance" {
  name         = "terraform-instance"
  machine_type = "e2-standard-4"
  zone         = var.zone
  tags         = ["web", "dev"]

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"
    }
  }
  metadata = {
    ssh-keys = "anassdah5:${file("~/.ssh/terraform_key.pub")}"
  }


  network_interface {
    network = google_compute_network.vpc_network.name
    access_config {
    }
  }
}

