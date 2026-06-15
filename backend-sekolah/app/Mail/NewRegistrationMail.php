<?php

namespace App\Mail;

use App\Models\Ppdb;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewRegistrationMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Data pendaftaran PPDB.
     *
     * @var \App\Models\Ppdb
     */
    public $ppdb;

    /**
     * Create a new message instance.
     */
    public function __construct(Ppdb $ppdb)
    {
        $this->ppdb = $ppdb;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $unitLabel = strtoupper($this->ppdb->unit);
        return new Envelope(
            subject: '[PPDB Baru] ' . $this->ppdb->nama_lengkap . ' (' . $unitLabel . ')',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.ppdb_registration',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
