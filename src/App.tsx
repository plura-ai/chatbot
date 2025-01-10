import "./App.css";
import ChatBot from './components/custom';

function App() {

  return (
    <>
      <div className="bg-secondary/30 flex justify-center h-screen">
        <div className='p-10 md:p-24 flex flex-col items-center gap-5 container mx-auto'>
          <h1 className='text-5xl md:text-6xl font-semibold tracking-tighter drop-shadow-sm select-none'>This is how the chatbot looks like.</h1>
          <ChatBot 
            chatBotWrapperStyle="absolute bottom-4 right-4 md:top-58 max-h-[600px] shadow-xl"
            chatWindowStyle="bg-black" 
            botIcon="" 
            userIcon= ""
            // prompt="You are an artist" 
            startOpen={true}
            authToken={""}
          /> 
        </div>
      </div>
    </>
  );
}

export default App;
