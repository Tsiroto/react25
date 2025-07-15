import { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';

export default function Terminal({ logs = [] }) {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        <Box
            component="footer"
            sx={{
                mt: 5,
                backgroundColor: '#111',
                color: '#0f0',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                p: 2,
                borderRadius: 1,
                height: 140,
                overflowY: 'auto',
            }}
        >
            {logs.length === 0 ? (
                <Typography
                    color="#e2e2e2"
                    fontFamily={"monospace"}
                    fontSize={"0.85rem"}
                >
                    #Terminal waiting for logs...
                </Typography>
            ) : (
                <>
                    {logs.map((log, index) => (
                        <Typography
                            key={index}
                            color="#e2e2e2"
                            fontFamily={"monospace"}
                            fontSize={"0.85rem"}
                        >
                            {`[${log.time}] > ${log.message}`}
                        </Typography>
                    ))}
                    <div ref={bottomRef} />
                </>
            )}
        </Box>
    );
}
