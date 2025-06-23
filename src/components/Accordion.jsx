import React from 'react'

const Accordion = () => {
  return (
    <div className="w-full lg:max-w-[50%] lg:mx-auto accordion accordion-flush" id="accordionFlushExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
      <p className='fw-normal fs-5'>What is Pause Point app?</p>
      </button>
    </h2>
    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body text-black/60">Pause Point app is a mobile application designed to enhance the living experience in a secure community.</div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      <p className='fw-normal fs-5'>How do i register using the app?</p>
      </button>
    </h2>
    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body text-black/60">To complete your registration, you have multiple choices. You can download the app to join your community, apply for community membership, or opt for socialite status to enjoy social event services.</div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
      <p className='fw-normal fs-5'>How are emergency alerts delivered through the app?</p>
      </button>
    </h2>
    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body text-black/60">Emergency alerts are sent as push notifications, ensuring residents receive critical information promptly.</div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse4" aria-expanded="false" aria-controls="flush-collapseThree">
      <p className='fw-normal fs-5'>What should i do if i notice a security concern?</p>
      </button>
    </h2>
    <div id="flush-collapse4" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body text-black/60">Use the Emergency feature in the app to report any security issues you encounter.</div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse5" aria-expanded="false" aria-controls="flush-collapseThree">
      <p className='fw-normal fs-5'>How can I grant access to my visitors through the app?</p>
      </button>
    </h2>
    <div id="flush-collapse5" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body text-black/60">To grant access to visitors, you can generate an access code and send it to them. This access code will be validated by security personnel at the point of entry.</div>
    </div>
  </div>
</div>

  )
}

export default Accordion