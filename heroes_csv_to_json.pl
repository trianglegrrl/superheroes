#!perl -w

use strict;
use warnings;

use Text::CSV;
use LWP::Simple;
use JSON;
use Data::Dumper;

=head1 NAME

heroes_csv_to_json.pl - convert heroes spreadsheet (exported as CSV) to json

=head1 SYNOPSIS

perl heroes_csv_to_json.pl

=head1 DESCRIPTION

Parses a CSV (Comma-Separated-Value) file of PN employees and generates JSON
suitable for insertion as a fixture in the PN Superheroes app.

=head1 AUTHOR

John Romkey<http://romkey.com/>

=head1 SEE ALSO

https://github.com/trianglegrrl/superheroes

=cut

# example superhero

#    id: 29,
#    fullName:"Krista Scott-Dixon",
#    email: "krista@precisionnutrition.com",

#    picUrl: "http://placepuppy.it/200/150",
#    discPicUrl: "/assets/SampleDISC.png",
#    whatILove: "Red wine, long walks on the beach, and classless subnetting.",
#    whatIHate: "Nazis, snakes, and Nazis.",
#    whatINeed: "Compassion, commitment, and $100,000 in unmarked US currency.",
#    majorDiscStyle: 'i',
#    superpowers: "Pushups, counting to 10, drop-kicking ill-behaved children.",
#    priorities: "Eating, sleeping, making life difficult for The Man.",

#    assertiveness:31,
#    aggressiveness:2,
#    egoDrive:9,
#    empathy:68,
#    egoStrengthResilience:34,
#    riskTaking:95,
#    urgency:42,
#    cautiousness:62,
#    sociability:4,
#    gregariousness:27,
#    accommodation:28,
#    skepticism:85,
#    abstractReasoning:99,
#    ideaOrientation:99,
#    thoroughness:91,
#    flexibility:44,
#    selfStructure:47,
#    externalStructure:4

if( $#ARGV > 0 ) {
  die 'usage: perl heroes_csv_to_json.pl <heroes.csv';
}

my $csv = Text::CSV->new( { allow_whitespace => 1, allow_loose_quotes => 1, auto_diag => 1, binary => 1 } );

$csv->column_names( $csv->getline ( *STDIN ) );
my $heroes = $csv->getline_hr_all( *STDIN );

foreach my $hero ( @{ $heroes }) {
  set_picUrl( $hero );
  set_pnProfileUrl( $hero );
  fix_fields( $hero );
}

my $json = JSON->new->utf8;
$json->pretty;
$json->canonical;

print $json->encode( $heroes );

# try guessing a couple of picture URLs and test for their existence
sub set_picUrl {
  my ( $hero ) = @_;

  my @name_parts = split( /\s/, $hero->{ fullName } );

  return unless( $#name_parts > -1 );

  my $picUrl = 'http://www.precisionnutrition.com/images/meet-the-team/thumbs/' . join( '-', @name_parts ) . '.jpg';
#  warn 'trying picUrl ' . $picUrl;
  if( head( $picUrl ) ) {
    $hero->{ picUrl } = $picUrl;
    return;
  }

  $picUrl = 'http://www.precisionnutrition.com/images/meet-the-team/thumbs/' . $name_parts[ 0 ] . '.jpg';
#  warn 'trying picUrl ' . $picUrl;
  if( head( $picUrl ) ) {
    $hero->{ picUrl } = $picUrl;
  }

#  warn 'no pic for ' . $hero->{ fullName } unless( $hero->{ picUrl } );
}

sub set_pnProfileUrl {
  my ( $hero ) = @_;

  # don't bother if we already have one
  return if( $hero->{ pnProfileUrl } );

  my @name_parts = split( /\s/, $hero->{ fullName } );
  for ( my $i = 0; $i <= $#name_parts; $i++ ) {
    $name_parts[ $i ] = lc( $name_parts[ $i ] );
  }

  my $pnProfileUrl  = 'http://www.precisionnutrition.com/images/meet-the-team/' . join( '-', @name_parts );
#  warn 'trying pn profile ' . $pnProfileUrl;

  if( head( $pnProfileUrl ) ) {
    $hero->{ pnProfileUrl } = $pnProfileUrl;
  }
}

sub fix_fields {
  my ( $hero ) = @_;

  if ( defined $hero->{ facebookURL } ) {
    $hero->{ facebookUrl } = $hero->{ facebookURL } unless( !$hero->{ facebookUrl } );
    delete $hero->{ facebookURL };
  }
}
