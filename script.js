document.getElementById("checkButton").addEventListener("click", function () {
    var urlInput = document.getElementById("urlInput");
    var results = document.getElementById("results");
    var urls = urlInput.value.split('\n').map(url => url.trim());

    results.innerHTML = "";

    function checkLink(index) {
        if (index < urls.length) {
            var url = urls[index];
            var resultMessage = document.createElement("div");

            fetch(url)
                .then(function (response) {
                    if (response.status === 200) {
                        resultMessage.innerText = "Link Vivo: " + url;
                        resultMessage.classList.add("alert", "alert-success");
                    } else {
                        resultMessage.innerText = "Link Morto: " + url;
                        resultMessage.classList.add("alert", "alert-danger");
                    }

                    results.appendChild(resultMessage);

                    // Verifique o próximo link na lista
                    checkLink(index + 1);
                })
                .catch(function (error) {
                    resultMessage.innerText = "Erro ao verificar o link M3U8: " + url;
                    resultMessage.classList.add("alert", "alert-danger");
                    results.appendChild(resultMessage);

                    // Verifique o próximo link na lista
                    checkLink(index + 1);
                });
        }
    }

    // Inicie a verificação com o primeiro link na lista
    checkLink(0);
});
