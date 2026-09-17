import { mount } from "svelte";
import "./style.css";
import App from "./dev/App.svelte";

mount(App, { target: document.getElementById("app")! });
