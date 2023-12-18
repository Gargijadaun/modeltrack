AFRAME.registerComponent('ar-trigger', {
    init: function () {
        const scene = this.el.sceneEl.object3D;

        // Create the tracked model (serving as a marker)
        const trackedModel = document.createElement('a-entity');
        trackedModel.setAttribute('gltf-model', 'scene.gltf');
        trackedModel.setAttribute('scale', '0.1 0.1 0.1');
        trackedModel.setAttribute('rotation', '-90 0 0');
        trackedModel.setAttribute('position', '0 0 0');

        // Create the triggering model
        const triggerModel = document.createElement('a-entity');
        triggerModel.setAttribute('gltf-model', 'scene.gltf');
        triggerModel.setAttribute('scale', '0.1 0.1 0.1');
        triggerModel.setAttribute('rotation', '-90 0 0');
        triggerModel.setAttribute('position', '0 0 0');
        triggerModel.setAttribute('visible', 'false'); // Initially hidden

        // Create the marker pattern
        const marker = document.createElement('a-marker-pattern');
        marker.setAttribute('preset', 'custom');
        marker.appendChild(trackedModel);

        // Attach the triggering model to the tracked model
        trackedModel.appendChild(triggerModel);

        // Add the marker to the scene
        scene.add(marker);

        // Event listener for when the marker is found
        trackedModel.addEventListener('markerFound', () => {
            triggerModel.setAttribute('visible', 'true'); // Show the triggering model
        });

        // Event listener for when the marker is lost
        trackedModel.addEventListener('markerLost', () => {
            triggerModel.setAttribute('visible', 'false'); // Hide the triggering model
        });
    },
});
