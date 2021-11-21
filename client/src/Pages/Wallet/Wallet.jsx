import React from 'react'

const Wallet = () => {
const wallet_data = {
_id: '619729dbcd05836c70437628',
owner: '619729dbcd05836c70437624',
cashTotal: 100000,
currencyUnit:"USD",
coinQuantity: [{}],
}
    return (
        <div>
            <h4>{wallet_data.cashTotal}</h4>
        </div>
    )
}

export default Wallet





