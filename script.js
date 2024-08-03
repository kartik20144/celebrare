document.addEventListener('DOMContentLoaded', () => {
    const shapes = document.querySelectorAll('.shape');
    const imageUpload = document.getElementById('image-upload');
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    const cropperContainer = document.querySelector('.cropper-container');
    const imageToCrop = document.getElementById('image-to-crop');
    const cropButton = document.getElementById('crop-button');

    let cropper;

    function updateMask(selectedMask) {
        shapes.forEach(shape => {
            const maskedImage = shape.querySelector('.masked-image');
            if (selectedMask === 'original') {
                maskedImage.style.maskImage = 'none';
            } else {
                maskedImage.style.maskImage = `url(${selectedMask})`;
            }
            maskedImage.style.display = 'block';
            
        });
    }

    function handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageToCrop.src = e.target.result;
                cropperContainer.style.display = 'block';
    
                // Destroy any previous cropper instance
                if (cropper) {
                    cropper.destroy();
                }
    
                // Initialize a new cropper instance
                cropper = new Cropper(imageToCrop, {
                    
                    viewMode: 1,
                    autoCropArea: 0.5,
                });
            };
            reader.readAsDataURL(file);
        }
    }
    

    cropButton.addEventListener('click', () => {
        const canvas = cropper.getCroppedCanvas();
        const croppedImage = canvas.toDataURL();

        shapes.forEach(shape => {
            const maskedImage = shape.querySelector('.masked-image');
            maskedImage.src = croppedImage;
            maskedImage.style.display = 'block';
        });

        cropperContainer.style.display = 'none';
        cropper.destroy();
    });

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
            const selectedMask = item.dataset.value;
            dropdownButton.textContent = "Select Frame";
            dropdownButton.appendChild(dropdownArrow);
            dropdownContent.classList.remove('show');
            dropdownContent.classList.add('hide');
            dropdownButton.classList.remove('active');
            updateMask(selectedMask);
        });
    });

    dropdownButton.addEventListener('click', () => {
        const isActive = dropdownButton.classList.contains('active');
        dropdownContent.classList.toggle('show', !isActive);
        dropdownContent.classList.toggle('hide', isActive);
        dropdownButton.classList.toggle('active', !isActive);
    });

    imageUpload.addEventListener('change', handleImageUpload);
});
