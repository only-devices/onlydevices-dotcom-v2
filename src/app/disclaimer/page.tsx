export default function DisclaimerPage() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">The Truth</h1>
        
        <div className="prose prose-blue">
          <p className="text-lg mb-6">
            In case you haven&apos;t noticed, Only Devices isn&apos;t a real company. It&apos;s not even really a real anything at this point. I&apos;d like it to become a music project, but in the meantime I just made a sarcastic fake SaaS company website with it.
          </p>
          <p className="text-lg mb-6">
            Check out my personal website for some more snarky humor: <a href="https://www.tuovila.com" className="text-blue-600 hover:text-blue-800">tuovila.com</a>
          </p>
        </div>
      </div>
    )
  }