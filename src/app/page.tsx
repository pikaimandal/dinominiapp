'use client';

import React, { useState, useEffect } from 'react';
import { MiniKit, VerificationLevel } from '@worldcoin/minikit-js'; // Import VerificationLevel enum
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const VerifyPage = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);

    // Ensure that client-only logic runs after the first render
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleVerify = async () => {
        if (!MiniKit.isInstalled()) {
            alert("Please install the Worldcoin App!");
            return;
        }

        setLoading(true);

        try {
            // Use the VerificationLevel enum instead of a plain string
            const verifyPayload = {
                action: "dino",  // Your action ID
                signal: "world-id",
                verification_level: VerificationLevel.Device,  // Orb | Device
            };

            const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

            if (finalPayload.status === 'error') {
                console.error("Verification failed:", finalPayload);
                setLoading(false);
                return;
            }

            // Store nullifier_hash and verification level in Firebase
            await setDoc(doc(db, 'users', finalPayload.nullifier_hash), {
                nullifier_hash: finalPayload.nullifier_hash,
                verification_level: finalPayload.verification_level,
                verified_at: new Date().toISOString(),
            });

            setIsVerified(true);
        } catch (error) {
            console.error("Error during verification:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isClient) {
        // Delay rendering client-side logic until after hydration
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>World ID Verification</h1>
            <button onClick={handleVerify} disabled={loading}>
                {loading ? 'Verifying...' : 'Verify with World ID'}
            </button>
            {isVerified && <p>Verification Successful!</p>}
        </div>
    );
};

export default VerifyPage;