'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Viewport({ color, source }: { color: string; source: string }) {
  const mount = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = mount.current; if (!host) return;
    const scene = new THREE.Scene(); scene.background = new THREE.Color('#10131c');
    const camera = new THREE.PerspectiveCamera(42, host.clientWidth / host.clientHeight, .1, 1000); camera.position.set(85, -105, 90); camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(host.clientWidth, host.clientHeight); host.appendChild(renderer.domElement);
    const grid = new THREE.GridHelper(180, 18, '#3a4356', '#252c39'); grid.rotation.x = Math.PI / 2; scene.add(grid);
    scene.add(new THREE.HemisphereLight('#e8efff', '#202634', 2)); const key = new THREE.DirectionalLight('#ffffff', 2.5); key.position.set(30, -40, 80); scene.add(key);
    const group = new THREE.Group(); scene.add(group);
    // A fast preview representation. A CAD engine plugin can replace this mesh with precise tessellation.
    const base = new THREE.Mesh(new THREE.BoxGeometry(74, 32, 4), new THREE.MeshStandardMaterial({ color, metalness: .12, roughness: .38 })); base.position.z = 2; group.add(base);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(4, 1.7, 16, 32), new THREE.MeshStandardMaterial({ color: '#252b38', roughness: .25 })); ring.position.set(-28, 0, 4.3); group.add(ring);
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(base.geometry), new THREE.LineBasicMaterial({ color: '#ffd98a' })); edge.position.copy(base.position); group.add(edge);
    let frame = 0; const animate = () => { group.rotation.z += .002; renderer.render(scene, camera); frame = requestAnimationFrame(animate); }; animate();
    const resize = () => { camera.aspect = host.clientWidth / host.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(host.clientWidth, host.clientHeight); }; const observer = new ResizeObserver(resize); observer.observe(host);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); renderer.dispose(); host.removeChild(renderer.domElement); };
  }, [color, source]);
  return <div className="viewport" ref={mount}><div className="view-cube">TOP<br /><span>FRONT</span></div><div className="viewport-note">Preview mesh · {source.length.toLocaleString()} chars</div></div>;
}
