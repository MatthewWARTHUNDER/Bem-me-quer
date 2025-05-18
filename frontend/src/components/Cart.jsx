import { useEffect } from 'react';

const Checkout = () => {
    useEffect(() => {
        const mp = new window.MercadoPago('TEST-cd12caa2-b4c6-4b45-b1ad-6d54563686fd', {
            locale: 'pt-BR',
        });

        mp.cardForm({
            amount: '100.00', // você pode usar o total do pedido dinamicamente
            autoMount: true,
            form: {
                id: 'form-checkout',
                cardholderName: { id: 'form-checkout__cardholderName' },
                cardholderEmail: { id: 'form-checkout__cardholderEmail' },
                cardNumber: { id: 'form-checkout__cardNumber' },
                expirationDate: { id: 'form-checkout__expirationDate' },
                securityCode: { id: 'form-checkout__securityCode' },
                installments: { id: 'form-checkout__installments' },
                identificationType: { id: 'form-checkout__identificationType' },
                identificationNumber: { id: 'form-checkout__identificationNumber' },
                issuer: { id: 'form-checkout__issuer' },
            },
            callbacks: {
                onSubmit: (event) => {
                    event.preventDefault();

                    const data = mp.cardForm().getCardFormData();

                    fetch('http://localhost:3000/processar-pagamento', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            transaction_amount: 100, 
                            token: data.token,
                            description: "Compra Bem-me-quer",
                            installments: Number(data.installments),
                            payment_method_id: data.paymentMethodId,
                            issuer_id: data.issuerId,
                            payer: {
                                email: data.cardholderEmail,
                                identification: {
                                    type: data.identificationType,
                                    number: data.identificationNumber,
                                },
                            },
                        }),
                    })
                        .then((res) => res.json())
                        .then((res) => {
                            if (res.status === 'approved') {
                                alert('Pagamento aprovado!');
                            } else {
                                alert('Pagamento pendente ou rejeitado.');
                            }
                        });
                }
            }
        });
    }, []);

    return (
        <form id="form-checkout">
            <div>
                <input type="text" id="form-checkout__cardholderName" placeholder="Nome do titular" />
                <input type="email" id="form-checkout__cardholderEmail" placeholder="Email" />
                <input type="text" id="form-checkout__cardNumber" placeholder="Número do cartão" />
                <input type="text" id="form-checkout__expirationDate" placeholder="MM/AA" />
                <input type="text" id="form-checkout__securityCode" placeholder="CVV" />
                <select id="form-checkout__installments"></select>
                <select id="form-checkout__identificationType"></select>
                <input type="text" id="form-checkout__identificationNumber" placeholder="CPF" />
                <select id="form-checkout__issuer"></select>
            </div>
            <button type="submit">Pagar</button>
        </form>
    );
};

export default Checkout;