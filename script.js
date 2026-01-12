// script.js
// Popup ochish va yopish
const popup = document.getElementById('popup');
const closeBtn = document.getElementById('closePopup');
closeBtn.onclick = () => { popup.style.display = 'none'; };

// Tablar
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabContents.forEach(c => c.style.display='none');
        document.getElementById(btn.dataset.tab).style.display='block';
        document.getElementById('orderFormContainer').style.display='none';
    });
});

// Kategoriya tablar
const categoryBtns = document.querySelectorAll('.category-btn');
const categories = document.querySelectorAll('.products');
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        categories.forEach(c => c.style.display='none');
        document.getElementById(btn.dataset.category).style.display='flex';
    });
});

// Sotib olish tugmasi bosilganda formani ko‘rsatish
const buyBtns = document.querySelectorAll('.buy-btn');
buyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        const price = btn.dataset.price;
        document.getElementById('orderFormContainer').style.display = 'block';
        document.getElementById('productName').value = name;
        document.getElementById('productPrice').value = price;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// To‘lov turi toggle
const paymentRadios = document.getElementsByName('paymentType');
const paymentUpload = document.getElementById('paymentUpload');
paymentRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if(radio.value === 'Online' && radio.checked){
            paymentUpload.style.display = 'block';
        } else if(radio.value === 'Naqd' && radio.checked){
            paymentUpload.style.display = 'none';
        }
    });
});

// Buyurtma form submit + Telegram bot integratsiyasi
const orderForm = document.getElementById('orderForm');
const BOT_TOKEN = '8094980287:AAFAfGhga5d6MKLsgBMxLE3wfCVcj6U3kg4';
const ADMIN_ID = '8215404911';

orderForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const product = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const paymentType = document.querySelector('input[name="paymentType"]:checked').value;
    const imageInput = document.getElementById('paymentImage');

    let message = `✅ Yangi buyurtma\nIsm: ${name}\nTelefon: ${phone}\nMahsulot: ${product}\nNarx: ${price} so'm\nTo'lov turi: ${paymentType}`;

    if(paymentType === 'Online' && imageInput.files.length > 0){
        message += `\nRasm fayli: ${imageInput.files[0].name}`;
    }

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ chat_id: ADMIN_ID, text: message })
    })
    .then(res => res.json())
    .then(data => {
        alert('Buyurtma yuborildi!');
        orderForm.reset();
        paymentUpload.style.display = 'none';
        document.getElementById('orderFormContainer').style.display = 'none';
    })
    .catch(err => {
        alert('Xatolik yuz berdi, qayta urinib ko‘ring.');
        console.error(err);
    });
});
 