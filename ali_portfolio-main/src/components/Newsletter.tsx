//@ts-nocheck
import React from 'react'

const Newsletter = () => {
  return (
    <div className="modal fade" id="modalbox" data-backdrop="static" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
            <div className="modal-content">
                <div className="modal-body">
                    <button className="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                    <div className="newsletter">
                        <h1>Get Newsletter</h1>
                        <hr />
                        <p>Enter your email in the box below to receive latest news and information about our activities</p>
                        <form>
                            <input type="email" placeholder="Email" required /><br/>
                            <button type="submit">Submit Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Newsletter