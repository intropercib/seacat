import React from "react";

const Footer = () => {
return (
    <div className="h-[300px] w-full bg-gray-900 flex items-center justify-center">
        <div className="flex flex-row gap-8 text-white">
            <h1 className="text-3xl font-bold ml-[200px]">SEACAT</h1>
            <div className="flex flex-col gap-1">
                <p className="font-bold text-sm text-neutral-300">NEW SUPERYACHT GENERATION</p>
                <p className=" text-sm text-neutral-400">
                    Write to us and we will contact you as soon as possible to share
                    more information.
                </p>
                <p className="text-3xl text-orange-400 underline decoration-dotted underline-offset-4">
                    abc@seacatclone.it
                </p>
            </div>
        </div>
    </div>
);
};

export default Footer;
