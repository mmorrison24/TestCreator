#!/bin/bash

## Enable PPA and install Ansible

# from http://www.ansibleworks.com/docs/intro_installation.html#latest-releases-via-apt-ubuntu

apt-get update --yes
apt-get install --yes python-software-properties
add-apt-repository --yes ppa:rquillo/ansible
apt-get update --yes
apt-get install --yes ansible
