document.addEventListener('DOMContentLoaded', () => {
    const shapes = document.querySelectorAll('.shape');
    const imageUpload = document.getElementById('image-upload');
    const dropdownButton = document.querySelector('.dropdown-button');
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownArrow = document.querySelector('.dropdown-arrow');
    const cropperContainer = document.querySelector('.cropper-container');
    const imageToCrop = document.getElementById('image-to-crop');
    const cropButton = document.getElementById('crop-button');
    const rotateLeftButton = document.getElementById('rotate-left-button');
    const rotateRightButton = document.getElementById('rotate-right-button');
    const flipHorizontalButton = document.getElementById('flip-horizontal-button');
    const flipVerticalButton = document.getElementById('flip-vertical-button');

    let cropper;
    let flipH = 1;
    let flipV = 1;

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

                const shapeElement = document.querySelector('.shape');
            const shapeElement2 = document.querySelector('.shape-container');
            shapeElement.classList.remove('visible');
            shapeElement2.classList.remove('visible');
    
                
                if (cropper) {
                    cropper.destroy();
                }
                 
              
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

        const shapeElement = document.querySelector('.shape');
shapeElement.classList.toggle('visible');
const shapeElement2 = document.querySelector('.shape-container');
shapeElement2.classList.toggle('visible');


        shapes.forEach(shape => {
            const maskedImage = shape.querySelector('.masked-image');
            maskedImage.src = croppedImage;
            maskedImage.style.display = 'block';
        });

        cropperContainer.style.display = 'none';
        cropper.destroy();
    });

    rotateLeftButton.addEventListener('click', () => {
        cropper.rotate(-90);
    });

    rotateRightButton.addEventListener('click', () => {
        cropper.rotate(90);
    });

    flipHorizontalButton.addEventListener('click', () => {
        flipH = -flipH;
        cropper.scaleX(flipH);
    });

    flipVerticalButton.addEventListener('click', () => {
        flipV = -flipV;
        cropper.scaleY(flipV);
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
